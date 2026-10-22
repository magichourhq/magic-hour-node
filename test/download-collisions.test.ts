import { createServer, type Server } from "node:http";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import Client from "magic-hour";

// Use real clients, response parsers, HTTP and filesystem writes. Only the remote
// API and CDN are replaced by a loopback server.
describe("project download filename collisions", () => {
  let server: Server;
  let baseUrl: string;
  let directory: string;
  let client: Client;

  beforeAll(async () => {
    server = createServer((req, res) => {
      const parts = req.url?.split("/") ?? [];
      const id = parts[3] ?? "unknown";
      if (parts[1] === "v1") {
        const extension =
          parts[2] === "video-projects"
            ? "mp4"
            : parts[2] === "audio-projects"
              ? "wav"
              : "png";
        const download = {
          url: `${baseUrl}/outputs/${id}/output.${extension}`,
          expires_at: "2026-10-23T00:00:00Z",
        };
        res.setHeader("content-type", "application/json");
        res.end(
          JSON.stringify({
            id,
            status: "complete",
            created_at: "2026-10-22T00:00:00Z",
            credits_charged: 5,
            total_frame_cost: 5,
            downloads: [download],
            download,
            enabled: true,
            error: null,
            name: "Local fixture",
            type: "fixture",
            image_count: 1,
            start_seconds: 0,
            end_seconds: 5,
            fps: 24,
            height: 512,
            width: 512,
          }),
        );
      } else if (parts[1] === "outputs") {
        res.end(parts[2]);
      } else {
        res.writeHead(404).end();
      }
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected a loopback server address");
    }
    baseUrl = `http://127.0.0.1:${address.port}`;
    client = new Client({ baseUrl, token: "local-test-token" });
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  });

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "magic-hour-download-"));
  });

  afterEach(() => fs.rmSync(directory, { recursive: true, force: true }));

  test.each(["imageProjects", "videoProjects", "audioProjects"] as const)(
    "%s preserves outputs from successive projects in the same directory",
    async (resource) => {
      const first = await client.v1[resource].checkResult(
        { id: "first-project" },
        { downloadDirectory: directory },
      );
      const second = await client.v1[resource].checkResult(
        { id: "second-project" },
        { downloadDirectory: directory },
      );
      expect(first.status).toBe("complete");
      expect(second.status).toBe("complete");
      expect(first.downloadErrors).toBeUndefined();
      expect(second.downloadErrors).toBeUndefined();
      expect(first.downloadedPaths).toHaveLength(1);
      expect(second.downloadedPaths).toHaveLength(1);
      expect(
        first.downloadedPaths?.map((file) => fs.readFileSync(file, "utf8")),
      ).toEqual(["first-project"]);
      expect(
        second.downloadedPaths?.map((file) => fs.readFileSync(file, "utf8")),
      ).toEqual(["second-project"]);
      expect(second.downloadedPaths).not.toEqual(first.downloadedPaths);
    },
  );

  test("concurrent downloads preserve existing files and each new output", async () => {
    fs.writeFileSync(
      path.join(directory, "output.png"),
      "user's existing file",
    );
    fs.writeFileSync(path.join(directory, "output_1.png"), "previous output");
    const results = await Promise.all(
      ["first-project", "second-project"].map((id) =>
        client.v1.imageProjects.checkResult(
          { id },
          { downloadDirectory: directory },
        ),
      ),
    );
    const paths = results.flatMap((result) => result.downloadedPaths ?? []);
    expect(new Set(paths).size).toBe(2);
    expect(paths.map((file) => fs.readFileSync(file, "utf8")).sort()).toEqual([
      "first-project",
      "second-project",
    ]);
    expect(fs.readFileSync(path.join(directory, "output.png"), "utf8")).toBe(
      "user's existing file",
    );
    expect(fs.readFileSync(path.join(directory, "output_1.png"), "utf8")).toBe(
      "previous output",
    );
  });

  test("an existing symlink does not redirect a download into another file", async () => {
    const original = path.join(directory, "original.png");
    fs.writeFileSync(original, "existing content");
    fs.symlinkSync(original, path.join(directory, "output.png"));
    const result = await client.v1.imageProjects.checkResult(
      { id: "new-project" },
      { downloadDirectory: directory },
    );
    expect(result.downloadErrors).toBeUndefined();
    expect(result.downloadedPaths).toHaveLength(1);
    expect(fs.readFileSync(original, "utf8")).toBe("existing content");
    expect(
      result.downloadedPaths?.map((file) => fs.readFileSync(file, "utf8")),
    ).toEqual(["new-project"]);
  });

  test("other filesystem failures retain the completed result and download error", async () => {
    const blockedDirectory = path.join(directory, "file-instead-of-directory");
    fs.writeFileSync(blockedDirectory, "existing content");
    const result = await client.v1.imageProjects.checkResult(
      { id: "new-project" },
      { downloadDirectory: blockedDirectory },
    );
    expect(result.status).toBe("complete");
    expect(result.downloads).toHaveLength(1);
    expect(result.downloadedPaths).toEqual([]);
    expect(result.downloadErrors).toEqual([
      expect.objectContaining({
        stage: "file",
        message: expect.stringContaining("ENOTDIR"),
      }),
    ]);
    expect(fs.readFileSync(blockedDirectory, "utf8")).toBe("existing content");
  });
});
