import Client from "magic-hour";
import { downloadFiles } from "magic-hour/helpers/download";
import { FilesClient } from "magic-hour/resources/v1/files";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

jest.mock("magic-hour/helpers/download", () => ({
  downloadFiles: jest.fn(),
}));
jest.mock("magic-hour/helpers/sleep", () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test.each([
  { image: "local/image.jpg", wait: true, download: true },
  { image: "https://example.com/image.jpg", wait: false, download: false },
  { image: "api-assets/image.jpg", wait: true, download: false },
])(
  "generate handles $image with wait=$wait and download=$download",
  async ({ image, wait, download }) => {
    const client = new Client({ token: "API_TOKEN" });
    const uploadedImage =
      image === "local/image.jpg" ? "api-assets/uploaded.jpg" : image;
    const upload = jest.spyOn(FilesClient.prototype, "uploadFile");
    if (image === "local/image.jpg") upload.mockResolvedValue(uploadedImage);
    jest.mocked(downloadFiles).mockResolvedValue(["output.mp4"]);
    let polls = 0;
    server.use(
      http.post(
        "https://api.magichour.ai/v1/ai-ugc-ad",
        async ({ request }) => {
          expect(await request.json()).toEqual({
            assets: {
              image_file_path: uploadedImage,
              extra_asset: "preserved",
            },
            end_seconds: 4,
            script: "Try our product.",
            model: "veo3.1",
            resolution: "1080p",
            extra_option: true,
          });
          return HttpResponse.json({
            id: "ugc-123",
            credits_charged: 1,
            estimated_frame_cost: 1,
          });
        },
      ),
      http.get("https://api.magichour.ai/v1/video-projects/ugc-123", () => {
        polls += 1;
        return HttpResponse.json({
          id: "ugc-123",
          status: polls === 1 ? "queued" : "complete",
          created_at: "2026-10-20T00:00:00Z",
          credits_charged: 1,
          download: null,
          downloads: [
            {
              url: "https://example.com/output.mp4",
              expires_at: "2026-10-21T00:00:00Z",
            },
          ],
          enabled: true,
          end_seconds: 4,
          error: null,
          fps: 30,
          height: 1080,
          name: null,
          start_seconds: 0,
          total_frame_cost: 1,
          type: "UGC_AD",
          width: 1920,
        });
      }),
    );
    const request = {
      assets: { imageFilePath: image, extra_asset: "preserved" },
      endSeconds: 4,
      script: "Try our product.",
      model: "veo3.1" as const,
      resolution: "1080p" as const,
      extra_option: true,
    };
    const result = download
      ? await client.v1.aiUgcAd.generate(request)
      : await client.v1.aiUgcAd.generate(request, {
          waitForCompletion: wait,
          downloadOutputs: download,
          downloadDirectory: "outputs",
        });

    expect(upload).toHaveBeenCalledWith(image);
    expect(request.assets.imageFilePath).toBe(image);
    expect(result.id).toBe("ugc-123");
    expect(result.status).toBe(wait ? "complete" : "queued");
    expect(polls).toBe(wait ? 2 : 1);
    if (download) {
      expect(result.downloadedPaths).toEqual(["output.mp4"]);
      expect(downloadFiles).toHaveBeenCalledWith(result.downloads, undefined);
    } else {
      expect(downloadFiles).not.toHaveBeenCalled();
    }
  },
);
