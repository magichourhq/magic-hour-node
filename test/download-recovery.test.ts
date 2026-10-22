import { createServer, type Server } from "node:http";
import * as fs from "node:fs";
import type { Socket } from "node:net";
import * as os from "node:os";
import * as path from "node:path";
import Client from "magic-hour";
import { gzipSync } from "node:zlib";
import { downloadFiles } from "magic-hour/helpers/download";
import { DownloadError } from "magic-hour/helpers/download-error";

jest.unmock("fs");
const realFs = jest.requireActual<typeof fs>("fs");

// Real HTTP streams and filesystem writes, with injected disk faults.
// No production API calls or paid generations are made.
describe("download failure recovery", () => {
  let server: Server;
  const sockets = new Set<Socket>();
  let baseUrl: string;
  let directory: string;
  let interrupt = true;

  beforeAll(async () => {
    server = createServer((req, res) => {
      const parts = req.url?.split("/") ?? [];
      const mode = parts[1];
      if (mode === "v1") {
        const id = parts[3];
        res.setHeader("content-type", "application/json");
        res.end(
          JSON.stringify({
            id,
            status: "complete",
            created_at: "2026-10-22T00:00:00Z",
            credits_charged: 5,
            total_frame_cost: 5,
            downloads: [
              {
                url: `${baseUrl}/${id}/output.png`,
                expires_at: "2026-10-23T00:00:00Z",
              },
            ],
            download: {
              url: `${baseUrl}/${id}/output.png`,
              expires_at: "2026-10-23T00:00:00Z",
            },
            enabled: true,
            error: null,
            name: "Local fixture",
            type:
              parts[2] === "image-projects"
                ? "AI_IMAGE"
                : parts[2] === "video-projects"
                  ? "TEXT_TO_VIDEO"
                  : "VOICE_GENERATOR",
            image_count: 1,
            start_seconds: 0,
            end_seconds: 5,
            fps: 24,
            height: 512,
            width: 512,
          }),
        );
      } else if (mode === "redirect") {
        res.writeHead(302, { location: "/compressed/output.png" }).end();
      } else if (mode === "compressed") {
        const body = gzipSync("complete output");
        res.setHeader("content-encoding", "gzip");
        res.setHeader("content-length", body.length);
        res.end(body);
      } else if (mode === "reset") {
        req.socket.destroy();
      } else if ((mode === "length" && interrupt) || mode === "chunked") {
        if (mode === "length") res.setHeader("content-length", "1024");
        res.write("partial");
        setImmediate(() => res.destroy());
      } else if (mode === "gzip") {
        res.setHeader("content-encoding", "gzip");
        res.end("invalid gzip");
      } else if (mode === "forbidden") {
        // Keep the error body open to verify the downloader releases it.
        res.writeHead(403);
        res.write("forbidden");
      } else {
        res.end("complete output");
      }
    });
    server.on("connection", (socket) => {
      sockets.add(socket);
      socket.on("close", () => sockets.delete(socket));
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    const address = server.address();
    if (!address || typeof address === "string")
      throw new Error("No test port");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    for (const socket of sockets) socket.destroy();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  });

  beforeEach(() => {
    interrupt = true;
    directory = fs.mkdtempSync(path.join(os.tmpdir(), "magic-hour-recovery-"));
    fs.writeFileSync(path.join(directory, "output.png"), "USER");
    fs.writeFileSync(path.join(directory, "output_1.png"), "EARLIER");
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(directory, { recursive: true, force: true });
  });

  function item(mode: string) {
    return {
      url: `${baseUrl}/${mode}/output.png`,
      expiresAt: "2026-10-23T00:00:00Z",
    };
  }

  // A deadline bounds the regression observation only, never product behavior.
  async function settles<T>(promise: Promise<T>): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        promise,
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("Download still pending after 1500ms")),
            1500,
          );
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  }

  function expectExistingFiles() {
    expect(fs.readFileSync(path.join(directory, "output.png"), "utf8")).toBe(
      "USER",
    );
    expect(fs.readFileSync(path.join(directory, "output_1.png"), "utf8")).toBe(
      "EARLIER",
    );
  }

  test.each(["length", "chunked", "reset", "gzip", "forbidden"])(
    "%s failure settles, reports later success and allows retry",
    async (mode) => {
      let failure: unknown;
      try {
        await settles(downloadFiles([item(mode), item("ok")], directory));
      } catch (error) {
        failure = error;
      }
      expect(failure).toBeInstanceOf(DownloadError);
      if (!(failure instanceof DownloadError)) throw failure;
      expect(failure.downloadErrors).toEqual([
        expect.objectContaining({ stage: "file", url: item(mode).url }),
      ]);
      expect(failure.downloadedPaths).toEqual([
        path.join(directory, "output_2.png"),
      ]);
      expect(
        fs.readFileSync(path.join(directory, "output_2.png"), "utf8"),
      ).toBe("complete output");
      expect(fs.readdirSync(directory).sort()).toEqual([
        "output.png",
        "output_1.png",
        "output_2.png",
      ]);
      const retry = await settles(downloadFiles([item("ok")], directory));
      expect(retry).toEqual([path.join(directory, "output_3.png")]);
      expectExistingFiles();
    },
  );

  test.each(["ENOSPC", "EEXIST"])(
    "partial disk write %s is removed and retry reuses its suffix",
    async (code) => {
      const write = realFs.writeSync;
      let descriptor: number | undefined;
      jest.spyOn(realFs, "writeSync").mockImplementationOnce((fd, data) => {
        if (typeof data === "string") throw new Error("Expected binary output");
        descriptor = fd;
        write(fd, data, 0, 2);
        throw Object.assign(new Error(`Injected ${code} after short write`), {
          code,
        });
      });
      await expect(
        settles(downloadFiles([item("ok")], directory)),
      ).rejects.toMatchObject({
        downloadedPaths: [],
        downloadErrors: [
          expect.objectContaining({
            stage: "file",
            message: expect.stringContaining(code),
          }),
        ],
      });
      expect(fs.readdirSync(directory).sort()).toEqual([
        "output.png",
        "output_1.png",
      ]);
      if (descriptor === undefined)
        throw new Error("Write fault was not reached");
      const closedDescriptor = descriptor;
      expect(() => fs.fstatSync(closedDescriptor)).toThrow("EBADF");
      expectExistingFiles();
      const retry = await settles(downloadFiles([item("ok")], directory));
      expect(retry).toEqual([path.join(directory, "output_2.png")]);
      expect(
        fs.readFileSync(path.join(directory, "output_2.png"), "utf8"),
      ).toBe("complete output");
    },
  );

  test("failed exclusive open never removes an existing file or symlink", async () => {
    const target = path.join(directory, "original.png");
    fs.writeFileSync(target, "SYMLINK TARGET");
    fs.symlinkSync(target, path.join(directory, "output_2.png"));
    const open = realFs.openSync;
    jest.spyOn(realFs, "openSync").mockImplementation((file, flags, mode) => {
      if (String(file).endsWith("output_3.png")) {
        throw Object.assign(new Error("Injected EACCES"), { code: "EACCES" });
      }
      return open(file, flags, mode);
    });
    await expect(
      settles(downloadFiles([item("ok")], directory)),
    ).rejects.toBeInstanceOf(DownloadError);
    expectExistingFiles();
    expect(
      fs.lstatSync(path.join(directory, "output_2.png")).isSymbolicLink(),
    ).toBe(true);
    expect(fs.readFileSync(target, "utf8")).toBe("SYMLINK TARGET");
  });

  test("a replacement file survives cleanup of the failed attempt", async () => {
    const destination = path.join(directory, "output_2.png");
    jest.spyOn(realFs, "writeSync").mockImplementationOnce(() => {
      fs.unlinkSync(destination);
      // Use a different write operation so the injected writeSync fault is not recursive.
      fs.copyFileSync(path.join(directory, "output.png"), destination);
      throw Object.assign(new Error("Injected ENOSPC after replacement"), {
        code: "ENOSPC",
      });
    });
    await expect(
      settles(downloadFiles([item("ok")], directory)),
    ).rejects.toBeInstanceOf(DownloadError);
    expect(fs.readFileSync(destination, "utf8")).toBe("USER");
    expectExistingFiles();
    expect(await settles(downloadFiles([item("ok")], directory))).toEqual([
      path.join(directory, "output_3.png"),
    ]);
  });

  test("cleanup failure preserves the original disk error and closes its descriptor", async () => {
    const write = realFs.writeSync;
    let descriptor: number | undefined;
    jest.spyOn(realFs, "writeSync").mockImplementationOnce((fd, data) => {
      if (typeof data === "string") throw new Error("Expected binary output");
      descriptor = fd;
      write(fd, data, 0, 2);
      throw Object.assign(new Error("Injected ENOSPC"), { code: "ENOSPC" });
    });
    jest.spyOn(realFs, "unlinkSync").mockImplementationOnce(() => {
      throw Object.assign(new Error("Injected cleanup EACCES"), {
        code: "EACCES",
      });
    });
    await expect(
      settles(downloadFiles([item("ok")], directory)),
    ).rejects.toMatchObject({
      downloadErrors: [expect.objectContaining({ message: "Injected ENOSPC" })],
    });
    if (descriptor === undefined)
      throw new Error("Write fault was not reached");
    const closedDescriptor = descriptor;
    expect(() => fs.fstatSync(closedDescriptor)).toThrow("EBADF");
    // Cleanup cannot remove a file when the filesystem denies unlink.
    expect(fs.readFileSync(path.join(directory, "output_2.png"), "utf8")).toBe(
      "co",
    );
    expectExistingFiles();
  });

  test("redirected compressed outputs retain decoded bytes", async () => {
    const paths = await settles(downloadFiles([item("redirect")], directory));
    expect(paths).toEqual([path.join(directory, "output_2.png")]);
    expect(fs.readFileSync(path.join(directory, "output_2.png"), "utf8")).toBe(
      "complete output",
    );
    expectExistingFiles();
  });

  test.each(["imageProjects", "videoProjects", "audioProjects"] as const)(
    "%s retains the complete project after interruption and recovers via checkResult",
    async (resource) => {
      const client = new Client({ baseUrl, token: "local-test-token" });
      const failed = await settles(
        client.v1[resource].checkResult(
          { id: "length" },
          { downloadDirectory: directory },
        ),
      );
      expect(failed.status).toBe("complete");
      expect(failed.downloads).toEqual([item("length")]);
      expect(failed.downloadedPaths).toEqual([]);
      expect(failed.downloadErrors).toEqual([
        expect.objectContaining({ stage: "file", url: item("length").url }),
      ]);
      interrupt = false;
      const recovered = await settles(
        client.v1[resource].checkResult(
          { id: "length" },
          { downloadDirectory: directory },
        ),
      );
      expect(recovered.status).toBe("complete");
      expect(recovered.downloadErrors).toBeUndefined();
      expect(recovered.downloadedPaths).toEqual([
        path.join(directory, "output_2.png"),
      ]);
      expectExistingFiles();
    },
  );
});
