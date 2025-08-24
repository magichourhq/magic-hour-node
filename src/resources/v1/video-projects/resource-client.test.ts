import Client, { Environment } from "magic-hour";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// Create MSW server
const server = setupServer();

// Mock the sleep helper
jest.mock("magic-hour/helpers/sleep", () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

// Mock the download helper
jest.mock("magic-hour/helpers/download", () => ({
  downloadFiles: jest.fn(),
}));

const { sleep } = require("magic-hour/helpers/sleep");
const { downloadFiles } = require("magic-hour/helpers/download");

describe("VideoProjectsClient.checkResult", () => {
  let client: Client;

  beforeAll(() => {
    // Start MSW server
    server.listen();
  });

  afterAll(() => {
    // Stop MSW server
    server.close();
  });

  beforeEach(() => {
    client = new Client({
      token: "API_TOKEN",
      environment: Environment.MockServer,
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Reset MSW handlers
    server.resetHandlers();
  });

  describe("Basic functionality", () => {
    test("should return response without waiting when waitForCompletion is false", async () => {
      const mockResponse = {
        id: "video-123",
        status: "rendering",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      // Set up MSW handler for the API call
      server.use(
        http.get(
          "https://api.sideko.dev/v1/mock/magichour/magic-hour/0.36.0/v1/video-projects/video-123",
          () => {
            return HttpResponse.json(mockResponse);
          },
        ),
      );

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { waitForCompletion: false },
      );

      expect(result).toEqual({
        id: "video-123",
        status: "rendering",
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      });
      expect(sleep).not.toHaveBeenCalled();
    });

    test("should wait for completion and return successful result", async () => {
      const renderingResponse = {
        id: "video-123",
        status: "rendering",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const completeResponse = {
        id: "video-123",
        status: "complete",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expires_at: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get(
          "https://api.sideko.dev/v1/mock/magichour/magic-hour/0.36.0/v1/video-projects/video-123",
          () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json(renderingResponse);
            } else {
              return HttpResponse.json(completeResponse);
            }
          },
        ),
      );

      downloadFiles.mockResolvedValue(["/tmp/video1.mp4"]);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        {
          waitForCompletion: true,
          downloadOutputs: true,
          downloadDirectory: "/tmp",
        },
      );

      expect(result).toEqual({
        id: "video-123",
        status: "complete",
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
        downloadedPaths: ["/tmp/video1.mp4"],
      });
      expect(sleep).toHaveBeenCalledWith(500); // Default poll interval
      expect(downloadFiles).toHaveBeenCalledWith(
        [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        "/tmp",
      );
    });

    test("should handle error status during polling", async () => {
      const renderingResponse = {
        id: "video-123",
        status: "rendering",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const errorResponse = {
        id: "video-123",
        status: "error",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: { message: "Rendering failed", code: "ERROR_001" },
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get(
          "https://api.sideko.dev/v1/mock/magichour/magic-hour/0.36.0/v1/video-projects/video-123",
          () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json(renderingResponse);
            } else {
              return HttpResponse.json(errorResponse);
            }
          },
        ),
      );

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { waitForCompletion: true },
      );

      expect(result).toEqual({
        id: "video-123",
        status: "error",
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: { message: "Rendering failed", code: "ERROR_001" },
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Video project video-123 has status error: [object Object]",
      );

      consoleSpy.mockRestore();
    });

    test("should handle canceled status during polling", async () => {
      const renderingResponse = {
        id: "video-123",
        status: "rendering",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const canceledResponse = {
        id: "video-123",
        status: "canceled",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get(
          "https://api.sideko.dev/v1/mock/magichour/magic-hour/0.36.0/v1/video-projects/video-123",
          () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json(renderingResponse);
            } else {
              return HttpResponse.json(canceledResponse);
            }
          },
        ),
      );

      const consoleSpy = jest.spyOn(console, "info").mockImplementation();

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { waitForCompletion: true },
      );

      expect(result).toEqual({
        id: "video-123",
        status: "canceled",
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        "Video project video-123 has status canceled: null",
      );

      consoleSpy.mockRestore();
    });
  });

  describe("Polling behavior", () => {
    test("should use custom poll interval from environment", async () => {
      const originalEnv = process.env["MAGIC_HOUR_POLL_INTERVAL"];

      const renderingResponse = {
        id: "video-123",
        status: "rendering",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const completeResponse = {
        id: "video-123",
        status: "complete",
        created_at: "2024-01-01T00:00:00Z",
        credits_charged: 15,
        download: null,
        downloads: [],
        enabled: true,
        end_seconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        start_seconds: 0.0,
        total_frame_cost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get(
          "https://api.sideko.dev/v1/mock/magichour/magic-hour/0.36.0/v1/video-projects/video-123",
          () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json(renderingResponse);
            } else {
              return HttpResponse.json(completeResponse);
            }
          },
        ),
      );

      // Set environment variable before the checkResult call
      process.env["MAGIC_HOUR_POLL_INTERVAL"] = "1.5";

      await client.v1.videoProjects.checkResult({ id: "video-123" });

      expect(sleep).toHaveBeenCalledWith(1500); // 1.5 seconds converted to milliseconds

      // Restore environment variable
      if (originalEnv !== undefined) {
        process.env["MAGIC_HOUR_POLL_INTERVAL"] = originalEnv;
      } else {
        delete process.env["MAGIC_HOUR_POLL_INTERVAL"];
      }
    });

    test("should poll multiple times until completion", async () => {
      const renderingResponse = {
        id: "video-123",
        status: "rendering" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const queuedResponse = {
        ...renderingResponse,
        status: "queued" as const,
      };

      const completeResponse = {
        ...renderingResponse,
        status: "complete" as const,
      };

      const getMock = jest.spyOn(client.v1.videoProjects, "get");
      getMock
        .mockResolvedValueOnce(renderingResponse)
        .mockResolvedValueOnce(queuedResponse)
        .mockResolvedValueOnce(completeResponse);

      await client.v1.videoProjects.checkResult({ id: "video-123" });

      expect(sleep).toHaveBeenCalledTimes(2);
      expect(client.v1.videoProjects.get).toHaveBeenCalledTimes(3);
    });
  });

  describe("Download functionality", () => {
    test("should skip download when downloadOutputs is false", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      jest
        .spyOn(client.v1.videoProjects, "get")
        .mockResolvedValue(completeResponse);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        {
          waitForCompletion: true,
          downloadOutputs: false,
        },
      );

      expect(result).toEqual(completeResponse);
      expect(downloadFiles).not.toHaveBeenCalled();
    });

    test("should download files to current directory when no downloadDirectory specified", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      jest
        .spyOn(client.v1.videoProjects, "get")
        .mockResolvedValue(completeResponse);
      downloadFiles.mockResolvedValue(["/current/dir/video1.mp4"]);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { downloadOutputs: true },
      );

      expect(downloadFiles).toHaveBeenCalledWith(
        completeResponse.downloads,
        undefined,
      );
      expect(result.downloadedPaths).toEqual(["/current/dir/video1.mp4"]);
    });

    test("should handle download errors gracefully", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      jest
        .spyOn(client.v1.videoProjects, "get")
        .mockResolvedValue(completeResponse);
      downloadFiles.mockRejectedValue(new Error("Download failed"));

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      await expect(
        client.v1.videoProjects.checkResult(
          { id: "video-123" },
          { downloadOutputs: true },
        ),
      ).rejects.toThrow("Download failed");

      consoleSpy.mockRestore();
    });
  });

  describe("Default behavior", () => {
    test("should use default options when no options provided", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const renderingResponse = {
        ...completeResponse,
        status: "rendering" as const,
      };

      const getMock = jest.spyOn(client.v1.videoProjects, "get");
      getMock
        .mockResolvedValueOnce(renderingResponse)
        .mockResolvedValueOnce(completeResponse);

      downloadFiles.mockResolvedValue(["/tmp/video1.mp4"]);

      const result = await client.v1.videoProjects.checkResult({
        id: "video-123",
      });

      expect(result.downloadedPaths).toEqual(["/tmp/video1.mp4"]);
      expect(sleep).toHaveBeenCalledWith(500); // Default poll interval
    });
  });

  describe("Request options", () => {
    test("should pass additional request options to get method", async () => {
      const mockResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      const getMock = jest.spyOn(client.v1.videoProjects, "get");
      getMock.mockResolvedValue(mockResponse);

      await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        {
          waitForCompletion: false,
          timeout: 30000,
        },
      );

      expect(getMock).toHaveBeenCalledWith(
        { id: "video-123" },
        {
          timeout: 30000,
        },
      );
    });
  });

  describe("Edge cases", () => {
    test("should handle immediate completion without polling", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      jest
        .spyOn(client.v1.videoProjects, "get")
        .mockResolvedValue(completeResponse);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { waitForCompletion: false },
      );

      expect(result).toEqual(completeResponse);
      expect(sleep).not.toHaveBeenCalled();
      expect(downloadFiles).not.toHaveBeenCalled();
    });

    test("should handle empty downloads array", async () => {
      const completeResponse = {
        id: "video-123",
        status: "complete" as const,
        createdAt: "2024-01-01T00:00:00Z",
        creditsCharged: 15,
        download: null,
        downloads: [],
        enabled: true,
        endSeconds: 10.5,
        error: null,
        fps: 30,
        height: 720,
        name: "Test Video Project",
        startSeconds: 0.0,
        totalFrameCost: 15,
        type: "VIDEO_TO_VIDEO",
        width: 1280,
      };

      jest
        .spyOn(client.v1.videoProjects, "get")
        .mockResolvedValue(completeResponse);
      downloadFiles.mockResolvedValue([]);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { downloadOutputs: true },
      );

      expect(result.downloadedPaths).toEqual([]);
      expect(downloadFiles).toHaveBeenCalledWith([], undefined);
    });

    test("should handle get method throwing error", async () => {
      const error = new Error("API Error");
      jest.spyOn(client.v1.videoProjects, "get").mockRejectedValue(error);

      await expect(
        client.v1.videoProjects.checkResult({ id: "video-123" }),
      ).rejects.toThrow("API Error");
    });
  });
});
