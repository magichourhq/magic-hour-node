import { once } from "node:events";
import * as fs from "node:fs";
import { createServer, type Server } from "node:http";
import type { Socket } from "node:net";
import * as os from "node:os";
import * as path from "node:path";

import Client, { ApiError } from "magic-hour";
import type { GenerateOptions } from "magic-hour/helpers/generate-type";
import type { External$V1AudioProjectsGetResponse } from "magic-hour/types/v1-audio-projects-get-response";

type Status = External$V1AudioProjectsGetResponse["status"];
type Tool = "aiVoiceGenerator" | "aiVoiceCloner";
const projectId = "voice-project";
const projectPath = `/v1/audio-projects/${projectId}`;
const output = Buffer.from("local audio output");
const originalInterval = process.env["MAGIC_HOUR_POLL_INTERVAL"];

let server: Server;
let baseUrl: string;
let directory: string;
let statuses: Status[];
let requests: string[];
let failures: number;
let emptyOutputs: boolean;
let stalled: boolean;
let getCount: number;
let projectType: "VOICE_GENERATOR" | "VOICE_CLONER";
const sockets = new Set<Socket>();

// Wire shape matches the audio formatter: lowercase statuses, nullable error,
// and an empty downloads array for pending, failed and canceled projects.
function project(status: Status): External$V1AudioProjectsGetResponse {
  return {
    id: projectId,
    name: "local fixture",
    type: projectType,
    created_at: "2026-10-22T00:00:00.000Z",
    enabled: true,
    credits_charged: status === "error" ? 0 : 2,
    status,
    downloads:
      status === "complete" && !emptyOutputs
        ? [{ url: `${baseUrl}/output.wav`, expires_at: "2099-01-01T00:00:00Z" }]
        : [],
    error:
      status === "error"
        ? {
            code: "invalid_prompt",
            message:
              "The prompt provided is invalid. Please make your prompt more specific and descriptive.",
          }
        : null,
  };
}

function generate(client: Client, tool: Tool, opts: GenerateOptions) {
  return tool === "aiVoiceGenerator"
    ? client.v1.aiVoiceGenerator.generate(
        { style: { prompt: "local fixture", voiceName: "Elon Musk" } },
        opts,
      )
    : client.v1.aiVoiceCloner.generate(
        {
          assets: { audioFilePath: "api-assets/local-fixture/input.wav" },
          style: { prompt: "local fixture" },
        },
        opts,
      );
}

beforeEach(async () => {
  statuses = ["complete"];
  requests = [];
  failures = 0;
  emptyOutputs = false;
  stalled = false;
  getCount = 0;
  projectType = "VOICE_GENERATOR";
  process.env["MAGIC_HOUR_POLL_INTERVAL"] = "0.001";
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "voice-lifecycle-"));
  server = createServer(async (req, res) => {
    requests.push(`${req.method} ${req.url}`);
    if (
      req.method === "POST" &&
      ["/v1/ai-voice-generator", "/v1/ai-voice-cloner"].includes(req.url ?? "")
    ) {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      const body = JSON.parse(Buffer.concat(chunks).toString());
      expect(body.style.prompt).toBe("local fixture");
      if (req.url === "/v1/ai-voice-cloner") {
        projectType = "VOICE_CLONER";
        expect(body.assets.audio_file_path).toBe(
          "api-assets/local-fixture/input.wav",
        );
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ id: projectId, credits_charged: 2 }));
    } else if (req.method === "GET" && req.url === projectPath) {
      getCount++;
      if (stalled) return;
      res.setHeader("Content-Type", "application/json");
      if (failures-- > 0 || getCount > 6) {
        res.writeHead(503);
        res.end(
          JSON.stringify({
            code: "internal_server_error",
            message: "local read failure",
          }),
        );
      } else {
        const status = statuses.length > 1 ? statuses.shift() : statuses[0];
        res.end(JSON.stringify(project(status ?? "error")));
      }
    } else if (req.method === "GET" && req.url === "/output.wav") {
      res.end(output);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: "not_found", message: "Not Found" }));
    }
  });
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (address === null || typeof address === "string")
    throw new Error("No TCP address");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterEach(async () => {
  for (const socket of sockets) socket.destroy();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  fs.rmSync(directory, { recursive: true, force: true });
  if (originalInterval === undefined)
    delete process.env["MAGIC_HOUR_POLL_INTERVAL"];
  else process.env["MAGIC_HOUR_POLL_INTERVAL"] = originalInterval;
});

describe.each<Tool>(["aiVoiceGenerator", "aiVoiceCloner"])(
  "%s.generate",
  (tool) => {
    const createPath = `/v1/${tool === "aiVoiceGenerator" ? "ai-voice-generator" : "ai-voice-cloner"}`;

    test.each<Status>(["complete", "error", "canceled"])(
      "returns initial %s through the audio parser without resubmitting",
      async (status) => {
        statuses = [status];
        const result = await generate(
          new Client({ baseUrl, token: "local-token" }),
          tool,
          { downloadDirectory: directory },
        );
        expect(result.status).toBe(status);
        expect(result.error).toEqual(project(status).error);
        expect(requests).toEqual([
          `POST ${createPath}`,
          `GET ${projectPath}`,
          ...(status === "complete" ? ["GET /output.wav"] : []),
        ]);
        if (status === "complete") {
          expect(result.downloadedPaths).toEqual([
            path.join(directory, "output.wav"),
          ]);
          expect(fs.readFileSync(path.join(directory, "output.wav"))).toEqual(
            output,
          );
        } else {
          expect(result.downloadedPaths).toBeUndefined();
          expect(fs.readdirSync(directory)).toEqual([]);
        }
      },
    );

    test.each<Status>(["complete", "error", "canceled"])(
      "stops queued/rendering polling at %s",
      async (status) => {
        statuses = ["queued", "rendering", status];
        const result = await generate(
          new Client({ baseUrl, token: "local-token" }),
          tool,
          { downloadDirectory: directory },
        );
        expect(result.status).toBe(status);
        expect(result.error).toEqual(project(status).error);
        expect(requests).toEqual([
          `POST ${createPath}`,
          ...Array<string>(3).fill(`GET ${projectPath}`),
          ...(status === "complete" ? ["GET /output.wav"] : []),
        ]);
      },
    );

    test("returns complete with empty outputs without downloading", async () => {
      emptyOutputs = true;
      const result = await generate(
        new Client({ baseUrl, token: "local-token" }),
        tool,
        { downloadDirectory: directory },
      );
      expect(result.downloads).toEqual([]);
      expect(result.downloadedPaths).toEqual([]);
      expect(requests).toEqual([`POST ${createPath}`, `GET ${projectPath}`]);
    });

    test("honors no-wait and no-download options", async () => {
      const client = new Client({ baseUrl, token: "local-token" });
      statuses = ["queued"];
      expect(
        (await generate(client, tool, { waitForCompletion: false })).status,
      ).toBe("queued");
      statuses = ["complete"];
      expect(
        (await generate(client, tool, { downloadOutputs: false }))
          .downloadedPaths,
      ).toBeUndefined();
      expect(requests).toEqual([
        `POST ${createPath}`,
        `GET ${projectPath}`,
        `POST ${createPath}`,
        `GET ${projectPath}`,
      ]);
    });

    test("propagates a GET failure, then recovers by reading the same ID", async () => {
      failures = 1;
      statuses = ["canceled"];
      const client = new Client({ baseUrl, token: "local-token" });
      const failure: unknown = await generate(client, tool, {}).catch(
        (error: unknown) => error,
      );
      expect(failure).toBeInstanceOf(ApiError);
      if (!(failure instanceof ApiError))
        throw new Error("Expected GET failure");
      expect(failure.response.status).toBe(503);
      expect(await failure.response.json()).toEqual({
        code: "internal_server_error",
        message: "local read failure",
      });
      const result = await client.v1.audioProjects.checkResult({
        id: projectId,
      });
      expect(result.status).toBe("canceled");
      expect(requests).toEqual([
        `POST ${createPath}`,
        `GET ${projectPath}`,
        `GET ${projectPath}`,
      ]);
    });

    test("passes request retry options to the audio GET without another create", async () => {
      failures = 1;
      statuses = ["canceled"];
      const result = await generate(
        new Client({ baseUrl, token: "local-token" }),
        tool,
        {
          retries: { maxRetries: 1, initialDelay: 1, statusCodes: [503] },
        },
      );
      expect(result.status).toBe("canceled");
      expect(requests).toEqual([
        `POST ${createPath}`,
        `GET ${projectPath}`,
        `GET ${projectPath}`,
      ]);
    });

    test("propagates request timeout without another create", async () => {
      stalled = true;
      await expect(
        generate(new Client({ baseUrl, token: "local-token" }), tool, {
          timeout: 100,
        }),
      ).rejects.toMatchObject({ name: "AbortError" });
      expect(requests).toEqual([`POST ${createPath}`, `GET ${projectPath}`]);
    });
  },
);
