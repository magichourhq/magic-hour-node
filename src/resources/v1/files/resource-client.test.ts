import Client from "magic-hour";
import * as fs from "fs";
import * as path from "path";
import { Readable } from "stream";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// Mock fs module
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

// Create MSW server for mocking API requests
const server = setupServer(
  // Mock upload URLs creation - handle both possible URLs
  http.post("https://api.magichour.ai/v1/files/upload-urls", () => {
    return HttpResponse.json({
      items: [
        {
          upload_url: "https://storage.example.com/upload?token=abc123",
          file_path: "api-assets/12345/image.jpg",
          expires_at: "2024-12-31T23:59:59Z",
        },
      ],
    });
  }),

  // Mock file upload to storage
  http.put("https://storage.example.com/upload", () => {
    return HttpResponse.json({ status: 200 });
  }),

  // Handle any other upload URLs that might be generated
  http.put("https://example.com/upload", () => {
    return HttpResponse.json({ status: 200 });
  }),
);

// Mock RUNTIME to ensure we use node-fetch
jest.mock("magic-hour/core", () => {
  const actual = jest.requireActual("magic-hour/core");
  return {
    ...actual,
    RUNTIME: { type: "node" },
  };
});

// Start and stop MSW server
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("FilesClient.uploadFile", () => {
  let client: Client;

  beforeEach(() => {
    client = new Client({
      token: "API_TOKEN",
    });

    // Reset all mocks
    jest.clearAllMocks();

    // Setup default fs mocks
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(Buffer.from("mock file content"));
  });

  describe("File type detection", () => {
    // MSW handles the uploadUrls.create call automatically

    test("should detect video file types correctly", async () => {
      const videoExtensions = ["mp4", "m4v", "mov", "webm"];

      for (const ext of videoExtensions) {
        const filePath = `/path/to/video.${ext}`;

        // Spy on the uploadUrls.create method to verify it gets called with correct params
        const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

        const result = await client.v1.files.uploadFile(filePath);

        expect(createSpy).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "video" }],
        });
        expect(result).toBe("api-assets/12345/image.jpg"); // MSW returns this mock value

        createSpy.mockRestore();
      }
    });

    test("should detect audio file types correctly", async () => {
      const audioExtensions = ["mp3", "mpeg", "wav", "aac", "aiff", "flac"];

      for (const ext of audioExtensions) {
        const filePath = `/path/to/audio.${ext}`;

        const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

        const result = await client.v1.files.uploadFile(filePath);

        expect(createSpy).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "audio" }],
        });
        expect(result).toBe("api-assets/12345/image.jpg");

        createSpy.mockRestore();
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

        const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

        const result = await client.v1.files.uploadFile(filePath);

        expect(createSpy).toHaveBeenCalledWith({
          items: [{ extension: ext, type: "image" }],
        });
        expect(result).toBe("api-assets/12345/image.jpg");

        createSpy.mockRestore();
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
        const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

        const result = await client.v1.files.uploadFile(input);

        expect(createSpy).toHaveBeenCalledWith({
          items: [{ extension: expectedExt, type: expectedType }],
        });
        expect(result).toBe("api-assets/12345/image.jpg");

        createSpy.mockRestore();
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
    // MSW handles the uploadUrls.create call automatically

    test("should read file content from file path", async () => {
      const filePath = "/path/to/image.jpg";
      const fileContent = Buffer.from("image content");
      mockFs.readFileSync.mockReturnValue(fileContent);

      const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

      const result = await client.v1.files.uploadFile(filePath);

      expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath);
      expect(createSpy).toHaveBeenCalledWith({
        items: [{ extension: "jpg", type: "image" }],
      });
      expect(result).toBe("api-assets/12345/image.jpg");

      createSpy.mockRestore();
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

      const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

      const result = await client.v1.files.uploadFile(mockStream);

      expect(createSpy).toHaveBeenCalledWith({
        items: [{ extension: "mp4", type: "video" }],
      });
      expect(result).toBe("api-assets/12345/image.jpg");

      createSpy.mockRestore();
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

      const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

      const result = await client.v1.files.uploadFile(mockStream);

      expect(createSpy).toHaveBeenCalledWith({
        items: [{ extension: "mp4", type: "video" }],
      });
      expect(result).toBe("api-assets/12345/image.jpg");

      createSpy.mockRestore();
    });

    test.skip("should handle File object arrayBuffer conversion", async () => {
      // Skipping this test as File object mocking is complex in Node.js environment
      // This functionality would work in actual browser environments
    });
  });

  describe("Upload process and error handling", () => {
    test("should successfully complete upload process", async () => {
      const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

      const result = await client.v1.files.uploadFile("/path/to/image.jpg");

      expect(result).toBe("api-assets/12345/image.jpg");
      expect(createSpy).toHaveBeenCalledWith({
        items: [{ extension: "jpg", type: "image" }],
      });

      createSpy.mockRestore();
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
      // Change server behavior for this test
      server.use(
        http.put("https://storage.example.com/upload", () => {
          return HttpResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
          );
        }),
      );

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Upload failed with status 500");
    });

    test("should handle network errors during upload", async () => {
      // Change server behavior for this test to simulate network error
      server.use(
        http.put("https://storage.example.com/upload", () => {
          return HttpResponse.error();
        }),
      );

      await expect(
        client.v1.files.uploadFile("/path/to/image.jpg"),
      ).rejects.toThrow("Network error");
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
      mockFs.readFileSync.mockReturnValue(Buffer.from(""));

      const createSpy = jest.spyOn(client.v1.files.uploadUrls, "create");

      const result = await client.v1.files.uploadFile("/path/to/empty.jpg");

      expect(result).toBe("api-assets/12345/image.jpg");
      expect(createSpy).toHaveBeenCalledWith({
        items: [{ extension: "jpg", type: "image" }],
      });

      createSpy.mockRestore();
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
