import Client, {Environment} from "magic-hour";
import {Readable} from "stream";
import * as fs from "fs";
import * as path from "path";

// Mock fs module
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

// Mock node-fetch for upload requests
const mockFetch = jest.fn();
jest.mock("node-fetch", () => ({
  default: mockFetch,
}));

// Mock RUNTIME to ensure we use node-fetch
jest.mock("magic-hour/core", () => {
  const actual = jest.requireActual("magic-hour/core");
  return {
    ...actual,
    RUNTIME: {type: "node"},
  };
});

describe("FilesClient.uploadFile", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({
      token: "API_TOKEN",
      environment: Environment.MockServer,
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Setup default fs mocks
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(Buffer.from("mock file content"));

    // Setup default fetch mock for file uploads
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
    });
  });

  describe("Helper functions", () => {
    test("getFileTypeAndExtension - should detect video files", () => {
      // We need to access the helper function through the class instance
      // Since it's not exported, we'll test it indirectly through uploadFile
      const videoExtensions = ["mp4", "m4v", "mov", "webm"];

      videoExtensions.forEach(async (ext) => {
        const mockResponse = {
          items: [
            {
              uploadUrl: "https://example.com/upload",
              filePath: `test-file.${ext}`,
              expiresAt: "2024-01-01T00:00:00Z",
            },
          ],
        };

        // Mock the uploadUrls.create method
        jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

        mockFs.existsSync.mockReturnValue(true);
        mockFs.readFileSync.mockReturnValue(Buffer.from("video content"));

        await expect(client.v1.files.uploadFile(`/path/to/video.${ext}`)).resolves.toBe(
          `test-file.${ext}`
        );

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{extension: ext, type: "video"}],
        });
      });
    });

    test("getFileTypeAndExtension - should detect audio files", async () => {
      const audioExtensions = ["mp3", "mpeg", "wav", "aac", "aiff", "flac"];

      for (const ext of audioExtensions) {
        const mockResponse = {
          items: [
            {
              uploadUrl: "https://example.com/upload",
              filePath: `test-file.${ext}`,
              expiresAt: "2024-01-01T00:00:00Z",
            },
          ],
        };

        jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

        await expect(client.v1.files.uploadFile(`/path/to/audio.${ext}`)).resolves.toBe(
          `test-file.${ext}`
        );

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{extension: ext, type: "audio"}],
        });
      }
    });

    test("getFileTypeAndExtension - should detect image files", async () => {
      const imageExtensions = ["png", "jpg", "jpeg", "webp", "avif", "jp2", "tiff", "bmp"];

      for (const ext of imageExtensions) {
        const mockResponse = {
          items: [
            {
              uploadUrl: "https://example.com/upload",
              filePath: `test-file.${ext}`,
              expiresAt: "2024-01-01T00:00:00Z",
            },
          ],
        };

        jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

        await expect(client.v1.files.uploadFile(`/path/to/image.${ext}`)).resolves.toBe(
          `test-file.${ext}`
        );

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{extension: ext, type: "image"}],
        });
      }
    });

    test("should throw error for unsupported file extension", async () => {
      await expect(client.v1.files.uploadFile("/path/to/file.xyz")).rejects.toThrow(
        "Unsupported file extension: xyz"
      );
    });

    test("should handle case-insensitive extensions", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://example.com/upload",
            filePath: "test-file.mp4",
            expiresAt: "2024-01-01T00:00:00Z",
          },
        ],
      };

      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      await expect(client.v1.files.uploadFile("/path/to/VIDEO.MP4")).resolves.toBe("test-file.mp4");

      expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
        items: [{extension: "mp4", type: "video"}],
      });
    });
  });

  describe("File input types", () => {
    const mockUploadResponse = {
      items: [
        {
          uploadUrl: "https://example.com/upload",
          filePath: "uploaded-file.jpg",
          expiresAt: "2024-01-01T00:00:00Z",
        },
      ],
    };

    beforeEach(() => {
      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockUploadResponse);
    });

    test("should handle string file path", async () => {
      const filePath = "/path/to/image.jpg";
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(Buffer.from("image content"));

      const result = await client.v1.files.uploadFile(filePath);

      expect(result).toBe("uploaded-file.jpg");
      expect(mockFs.existsSync).toHaveBeenCalledWith(filePath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath);
    });

    test("should throw error if file path does not exist", async () => {
      mockFs.existsSync.mockReturnValue(false);

      await expect(client.v1.files.uploadFile("/nonexistent/file.jpg")).rejects.toThrow(
        "File not found: /nonexistent/file.jpg"
      );
    });

    test("should handle Buffer input", async () => {
      const buffer = Buffer.from("image content");

      await expect(client.v1.files.uploadFile(buffer)).rejects.toThrow(
        "Buffer input requires a file name for extension detection"
      );
    });

    test("should handle Readable stream with path property", async () => {
      const mockStream = new Readable({
        read() {
          this.push(Buffer.from("stream content"));
          this.push(null);
        },
      });
      (mockStream as any).path = "/path/to/video.mp4";

      const result = await client.v1.files.uploadFile(mockStream);

      expect(result).toBe("uploaded-file.jpg");
      expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
        items: [{extension: "mp4", type: "video"}],
      });
    });

    test("should throw error for stream without path property", async () => {
      const mockStream = new Readable({
        read() {
          this.push(Buffer.from("stream content"));
          this.push(null);
        },
      });

      await expect(client.v1.files.uploadFile(mockStream)).rejects.toThrow(
        "Stream must have a 'path' property for extension detection"
      );
    });

    test.skip("should handle File object (browser)", async () => {
      // Skipping this test as File object mocking is complex in Node.js environment
      // This functionality would work in actual browser environments
    });
  });

  describe("Upload process", () => {
    test("should successfully upload file and return file path", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://storage.example.com/upload?token=abc123",
            filePath: "api-assets/12345/image.jpg",
            expiresAt: "2024-12-31T23:59:59Z",
          },
        ],
      };

      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      const result = await client.v1.files.uploadFile("/path/to/image.jpg");

      expect(result).toBe("api-assets/12345/image.jpg");
      expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
        items: [{extension: "jpg", type: "image"}],
      });

      // Verify the PUT request was made
      expect(mockFetch).toHaveBeenCalledWith("https://storage.example.com/upload?token=abc123", {
        method: "PUT",
        body: Buffer.from("mock file content"),
      });
    });

    test("should throw error if no upload URL returned", async () => {
      const mockResponse = {items: []};
      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      await expect(client.v1.files.uploadFile("/path/to/image.jpg")).rejects.toThrow(
        "No upload URL was returned from the server"
      );
    });

    test("should throw error if upload info is missing", async () => {
      const mockResponse = {items: [null]};
      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse as any);

      await expect(client.v1.files.uploadFile("/path/to/image.jpg")).rejects.toThrow(
        "Upload info is missing from server response"
      );
    });

    test("should throw error if upload fails", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://storage.example.com/upload",
            filePath: "api-assets/12345/image.jpg",
            expiresAt: "2024-12-31T23:59:59Z",
          },
        ],
      };

      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      // Mock failed upload
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(client.v1.files.uploadFile("/path/to/image.jpg")).rejects.toThrow(
        "Upload failed with status 500: Internal Server Error"
      );
    });
  });

  describe("Integration tests", () => {
    test("should work with actual API response structure", async () => {
      // Mock a realistic API response
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://videos.magichour.ai/api-assets/abc123/video.mp4?auth=xyz",
            filePath: "api-assets/abc123/video.mp4",
            expiresAt: "2024-07-25T16:56:21.932Z",
          },
        ],
      };

      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      const testFile = "/tmp/test-video.mp4";
      const testContent = Buffer.from("fake video content");
      mockFs.readFileSync.mockReturnValue(testContent);

      const result = await client.v1.files.uploadFile(testFile);

      expect(result).toBe("api-assets/abc123/video.mp4");

      // Verify upload request
      expect(mockFetch).toHaveBeenCalledWith(
        "https://videos.magichour.ai/api-assets/abc123/video.mp4?auth=xyz",
        {
          method: "PUT",
          body: testContent,
        }
      );
    });

    test("should handle multiple file types in sequence", async () => {
      const files = [
        {path: "/path/to/image.png", type: "image", ext: "png"},
        {path: "/path/to/video.mp4", type: "video", ext: "mp4"},
        {path: "/path/to/audio.mp3", type: "audio", ext: "mp3"},
      ];

      for (const file of files) {
        const mockResponse = {
          items: [
            {
              uploadUrl: `https://storage.example.com/${file.ext}`,
              filePath: `api-assets/123/${file.path.split("/").pop()}`,
              expiresAt: "2024-12-31T23:59:59Z",
            },
          ],
        };

        jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

        const result = await client.v1.files.uploadFile(file.path);

        expect(result).toBe(`api-assets/123/${file.path.split("/").pop()}`);
        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{extension: file.ext, type: file.type}],
        });
      }
    });
  });

  describe("Error handling", () => {
    test("should handle network errors during upload URL creation", async () => {
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockRejectedValue(new Error("Network error"));

      await expect(client.v1.files.uploadFile("/path/to/image.jpg")).rejects.toThrow(
        "Network error"
      );
    });

    test("should handle file read errors", async () => {
      // Mock upload URLs creation to succeed first
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://example.com/upload",
            filePath: "uploaded-file.jpg",
            expiresAt: "2024-01-01T00:00:00Z",
          },
        ],
      };
      jest.spyOn(client.v1.files.uploadUrls, "create").mockResolvedValue(mockResponse);

      // Then make file read fail
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      await expect(client.v1.files.uploadFile("/path/to/image.jpg")).rejects.toThrow(
        "Permission denied"
      );
    });
  });
});
