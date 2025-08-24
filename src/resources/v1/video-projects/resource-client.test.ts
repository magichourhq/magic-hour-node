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
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Reset MSW handlers
    server.resetHandlers();

    // Clean up environment variables
    delete process.env["MAGIC_HOUR_POLL_INTERVAL"];
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
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(mockResponse);
        }),
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
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else {
            return HttpResponse.json(completeResponse);
          }
        }),
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
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else {
            return HttpResponse.json(errorResponse);
          }
        }),
      );

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
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else {
            return HttpResponse.json(canceledResponse);
          }
        }),
      );

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
    });
  });

  describe("Polling behavior", () => {
    test("should use custom poll interval from environment", async () => {
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
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else {
            return HttpResponse.json(completeResponse);
          }
        }),
      );

      // Set environment variable before the checkResult call
      process.env["MAGIC_HOUR_POLL_INTERVAL"] = "1.5";

      try {
        await client.v1.videoProjects.checkResult({ id: "video-123" });
        expect(sleep).toHaveBeenCalledWith(1500); // 1.5 seconds converted to milliseconds
      } finally {
        // Clean up environment variable
        delete process.env["MAGIC_HOUR_POLL_INTERVAL"];
      }
    });

    test("should poll multiple times until completion", async () => {
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

      const queuedResponse = {
        ...renderingResponse,
        status: "queued",
      };

      const completeResponse = {
        ...renderingResponse,
        status: "complete",
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else if (callCount === 2) {
            return HttpResponse.json(queuedResponse);
          } else {
            return HttpResponse.json(completeResponse);
          }
        }),
      );

      await client.v1.videoProjects.checkResult({ id: "video-123" });

      expect(sleep).toHaveBeenCalledTimes(2);
    });
  });

  describe("Download functionality", () => {
    test("should skip download when downloadOutputs is false", async () => {
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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(completeResponse);
        }),
      );

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        {
          waitForCompletion: true,
          downloadOutputs: false,
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
      });
      expect(downloadFiles).not.toHaveBeenCalled();
    });

    test("should download files to current directory when no downloadDirectory specified", async () => {
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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(completeResponse);
        }),
      );
      downloadFiles.mockResolvedValue(["/current/dir/video1.mp4"]);

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { downloadOutputs: true },
      );

      expect(downloadFiles).toHaveBeenCalledWith(
        [
          {
            url: "https://example.com/download/video1.mp4",
            expiresAt: "2024-01-01T01:00:00Z",
          },
        ],
        undefined,
      );
      expect(result.downloadedPaths).toEqual(["/current/dir/video1.mp4"]);
    });

    test("should handle download errors gracefully", async () => {
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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(completeResponse);
        }),
      );
      downloadFiles.mockRejectedValue(new Error("Download failed"));

      await expect(
        client.v1.videoProjects.checkResult(
          { id: "video-123" },
          { downloadOutputs: true },
        ),
      ).rejects.toThrow("Download failed");
    });
  });

  describe("Default behavior", () => {
    test("should use default options when no options provided", async () => {
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

      const renderingResponse = {
        ...completeResponse,
        status: "rendering",
      };

      let callCount = 0;

      // Set up MSW handler that returns different responses on each call
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(renderingResponse);
          } else {
            return HttpResponse.json(completeResponse);
          }
        }),
      );

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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(mockResponse);
        }),
      );

      const getMock = jest.spyOn(client.v1.videoProjects, "get");

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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(completeResponse);
        }),
      );

      const result = await client.v1.videoProjects.checkResult(
        { id: "video-123" },
        { waitForCompletion: false },
      );

      expect(result).toEqual({
        id: "video-123",
        status: "complete",
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
      expect(downloadFiles).not.toHaveBeenCalled();
    });

    test("should handle empty downloads array", async () => {
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

      // Set up MSW handler
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json(completeResponse);
        }),
      );
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

      // Set up MSW handler that returns an error
      server.use(
        http.get("https://api.magichour.ai/v1/video-projects/video-123", () => {
          return HttpResponse.json({ error: "API Error" }, { status: 500 });
        }),
      );

      await expect(
        client.v1.videoProjects.checkResult({ id: "video-123" }),
      ).rejects.toThrow();
    });
  });
});
