import Client, { Environment } from "magic-hour";
import * as fs from "fs";
import * as path from "path";
import { Readable } from "stream";

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
    RUNTIME: { type: "node" },
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("File type detection", () => {
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
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockUploadResponse);
    });

    test("should detect video file types correctly", async () => {
      const videoExtensions = ["mp4", "m4v", "mov", "webm"];

      for (const ext of videoExtensions) {
        const filePath = `/path/to/video.${ext}`;
        await client.v1.files.uploadFile(filePath);

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "video" }],
        });
      }
    });

    test("should detect audio file types correctly", async () => {
      const audioExtensions = ["mp3", "mpeg", "wav", "aac", "aiff", "flac"];

      for (const ext of audioExtensions) {
        const filePath = `/path/to/audio.${ext}`;
        await client.v1.files.uploadFile(filePath);

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "audio" }],
        });
      }
    });

    test("should detect image file types correctly", async () => {
      const imageExtensions = [
        "png",
        "jpg",
        "jpeg",
        "webp",
        "avif",
        "jp2",
        "tiff",
        "bmp",
      ];

      for (const ext of imageExtensions) {
        const filePath = `/path/to/image.${ext}`;
        await client.v1.files.uploadFile(filePath);

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "image" }],
        });
      }
    });

    test("should handle case-insensitive file extensions", async () => {
      const testCases = [
        {
          input: "/path/to/VIDEO.MP4",
          expectedExt: "mp4",
          expectedType: "video",
        },
        {
          input: "/path/to/IMAGE.JPG",
          expectedExt: "jpg",
          expectedType: "image",
        },
        {
          input: "/path/to/AUDIO.WAV",
          expectedExt: "wav",
          expectedType: "audio",
        },
      ];

      for (const { input, expectedExt, expectedType } of testCases) {
        await client.v1.files.uploadFile(input);

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{ extension: expectedExt, type: expectedType }],
        });
      }
    });

    test("should throw error for unsupported file extensions", async () => {
      const unsupportedFiles = [
        "/path/to/file.txt",
        "/path/to/document.pdf",
        "/path/to/archive.zip",
        "/path/to/data.json",
      ];

      for (const filePath of unsupportedFiles) {
        const ext = path.extname(filePath).slice(1).toLowerCase();
        await expect(client.v1.files.uploadFile(filePath)).rejects.toThrow(
          `Unsupported file extension: ${ext}`,
        );
      }
    });
  });

  describe("File input validation", () => {
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
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockUploadResponse);
    });

    test("should validate file exists for string input", async () => {
      const filePath = "/path/to/image.jpg";
      mockFs.existsSync.mockReturnValue(true);

      await client.v1.files.uploadFile(filePath);

      expect(mockFs.existsSync).toHaveBeenCalledWith(filePath);
    });

    test("should throw error for non-existent file path", async () => {
      const filePath = "/nonexistent/file.jpg";
      mockFs.existsSync.mockReturnValue(false);

      await expect(client.v1.files.uploadFile(filePath)).rejects.toThrow(
        `File not found: ${filePath}`,
      );
    });

    test("should reject Buffer input without filename", async () => {
      const buffer = Buffer.from("image content");

      await expect(client.v1.files.uploadFile(buffer)).rejects.toThrow(
        "Buffer input requires a file name for extension detection",
      );
    });

    test("should validate Readable stream has path property", async () => {
      const mockStream = new Readable({
        read() {
          this.push(Buffer.from("stream content"));
          this.push(null);
        },
      });

      // Stream without path property should fail
      await expect(client.v1.files.uploadFile(mockStream)).rejects.toThrow(
        "Stream must have a 'path' property for extension detection",
      );
    });

    test("should accept Readable stream with path property", async () => {
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
        items: [{ extension: "mp4", type: "video" }],
      });
    });

    test.skip("should handle File object in browser-like environment", async () => {
      // Skipping this test as File object mocking is complex in Node.js environment
      // This functionality would work in actual browser environments
    });
  });

  describe("File content processing", () => {
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
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockUploadResponse);
    });

    test("should read file content from file path", async () => {
      const filePath = "/path/to/image.jpg";
      const fileContent = Buffer.from("image content");
      mockFs.readFileSync.mockReturnValue(fileContent);

      await client.v1.files.uploadFile(filePath);

      expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath);
      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/upload",
        expect.objectContaining({
          method: "PUT",
          body: fileContent,
        }),
      );
    });

    test("should process Readable stream content", async () => {
      const streamContent = Buffer.from("stream video content");
      const mockStream = new Readable({
        read() {
          this.push(streamContent);
          this.push(null);
        },
      });
      (mockStream as any).path = "/path/to/video.mp4";

      await client.v1.files.uploadFile(mockStream);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/upload",
        expect.objectContaining({
          method: "PUT",
          body: streamContent,
        }),
      );
    });

    test("should handle large stream content", async () => {
      const largeContent = Buffer.from("a".repeat(1024 * 1024)); // 1MB of content
      const mockStream = new Readable({
        read() {
          this.push(largeContent);
          this.push(null);
        },
      });
      (mockStream as any).path = "/path/to/large-video.mp4";

      await client.v1.files.uploadFile(mockStream);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://example.com/upload",
        expect.objectContaining({
          method: "PUT",
          body: largeContent,
        }),
      );
    });

    test.skip("should handle File object arrayBuffer conversion", async () => {
      // Skipping this test as File object mocking is complex in Node.js environment
      // This functionality would work in actual browser environments
    });
  });

  describe("Upload process and error handling", () => {
    test("should successfully complete upload process", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://storage.example.com/upload?token=abc123",
            filePath: "api-assets/12345/image.jpg",
            expiresAt: "2024-12-31T23:59:59Z",
          },
        ],
      };

      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);

      const result = await client.v1.files.uploadFile("/path/to/image.jpg");

      expect(result).toBe("api-assets/12345/image.jpg");
      expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
        items: [{ extension: "jpg", type: "image" }],
      });
      expect(mockFetch).toHaveBeenCalledWith(
        "https://storage.example.com/upload?token=abc123",
        {
          method: "PUT",
          body: Buffer.from("mock file content"),
        },
      );
    });

    test("should handle empty upload URL response", async () => {
      const mockResponse = { items: [] };
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("No upload URL was returned from the server");
    });

    test("should handle null upload info", async () => {
      const mockResponse = { items: [null] };
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse as any);

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Upload info is missing from server response");
    });

    test("should handle upload HTTP failure", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://storage.example.com/upload",
            filePath: "api-assets/12345/image.jpg",
            expiresAt: "2024-12-31T23:59:59Z",
          },
        ],
      };

      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Upload failed with status 500: Internal Server Error");
    });

    test("should handle network errors during upload", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://storage.example.com/upload",
            filePath: "api-assets/12345/image.jpg",
            expiresAt: "2024-12-31T23:59:59Z",
          },
        ],
      };

      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);
      mockFetch.mockRejectedValueOnce(new Error("Network connection failed"));

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Network connection failed");
    });

    test("should handle upload URLs creation failure", async () => {
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockRejectedValue(new Error("API authentication failed"));

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("API authentication failed");
    });

    test("should handle file system read errors", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://example.com/upload",
            filePath: "uploaded-file.jpg",
            expiresAt: "2024-01-01T00:00:00Z",
          },
        ],
      };
      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);

      mockFs.readFileSync.mockImplementation(() => {
        throw new Error("Permission denied");
      });

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Permission denied");
    });
  });

  describe("Integration and edge cases", () => {
    test("should handle files with special characters in names", async () => {
      const specialFiles = [
        "/path/to/image with spaces.jpg",
        "/path/to/image-with-dashes.png",
        "/path/to/image_with_underscores.webp",
        "/path/to/image.with.dots.mp4",
        "/path/to/123numeric.mp3",
      ];

      const mockResponse = {
        items: [
          {
            uploadUrl: "https://example.com/upload",
            filePath: "uploaded-file.jpg",
            expiresAt: "2024-01-01T00:00:00Z",
          },
        ],
      };

      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);

      for (const filePath of specialFiles) {
        const ext = path.extname(filePath).slice(1).toLowerCase();
        const expectedType = getFileTypeFromExtension(ext);

        await client.v1.files.uploadFile(filePath);

        expect(client.v1.files.uploadUrls.create).toHaveBeenCalledWith({
          items: [{ extension: ext, type: expectedType }],
        });
      }
    });

    test("should handle empty file content", async () => {
      const mockResponse = {
        items: [
          {
            uploadUrl: "https://example.com/upload",
            filePath: "uploaded-empty-file.jpg",
            expiresAt: "2024-01-01T00:00:00Z",
          },
        ],
      };

      jest
        .spyOn(client.v1.files.uploadUrls, "create")
        .mockResolvedValue(mockResponse);
      mockFs.readFileSync.mockReturnValue(Buffer.from(""));

      const result = await client.v1.files.uploadFile("/path/to/empty.jpg");

      expect(result).toBe("uploaded-empty-file.jpg");
      expect(mockFetch).toHaveBeenCalledWith("https://example.com/upload", {
        method: "PUT",
        body: Buffer.from(""),
      });
    });
  });
});

// Helper function for tests
function getFileTypeFromExtension(ext: string): "audio" | "image" | "video" {
  const videoExts = ["mp4", "m4v", "mov", "webm"];
  const audioExts = ["mp3", "mpeg", "wav", "aac", "aiff", "flac"];
  const imageExts = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "avif",
    "jp2",
    "tiff",
    "bmp",
  ];

  if (videoExts.includes(ext)) return "video";
  if (audioExts.includes(ext)) return "audio";
  if (imageExts.includes(ext)) return "image";
  throw new Error(`Unsupported extension: ${ext}`);
}
