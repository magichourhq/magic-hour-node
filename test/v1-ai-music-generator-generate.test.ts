import Client from "magic-hour";
import { downloadFiles } from "magic-hour/helpers/download";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

jest.mock("magic-hour/helpers/download", () => ({ downloadFiles: jest.fn() }));
jest.mock("magic-hour/helpers/sleep", () => ({
  sleep: jest.fn().mockResolvedValue(undefined),
}));

const server = setupServer();
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

test.each([
  { wait: true, download: true },
  { wait: false, download: false },
  { wait: true, download: false },
])(
  "generate music with wait=$wait and download=$download",
  async ({ wait, download }) => {
    const client = new Client({ token: "API_TOKEN" });
    jest.mocked(downloadFiles).mockResolvedValue(["music.mp3"]);
    let polls = 0;
    server.use(
      http.post(
        "https://api.magichour.ai/v1/ai-music-generator",
        async ({ request }) => {
          expect(await request.json()).toEqual({
            duration: 120,
            name: "Music",
            style: {
              prompt: "Synthwave",
              instrumental: false,
              lyrics: "City lights",
            },
            extra_option: true,
          });
          expect(request.headers.get("x-test")).toBe("forwarded");
          return HttpResponse.json({ id: "music-123", credits_charged: 120 });
        },
      ),
      http.get(
        "https://api.magichour.ai/v1/audio-projects/music-123",
        ({ request }) => {
          expect(request.headers.get("x-test")).toBe("forwarded");
          polls += 1;
          return HttpResponse.json({
            id: "music-123",
            status: polls === 1 ? "queued" : "complete",
            created_at: "2026-10-22T00:00:00Z",
            credits_charged: 120,
            downloads: [
              {
                url: "https://example.com/music.mp3",
                expires_at: "2026-10-23T00:00:00Z",
              },
            ],
            enabled: true,
            error: null,
            name: "Music",
            type: "MUSIC_GENERATOR",
          });
        },
      ),
    );
    const request = {
      duration: 120,
      name: "Music",
      style: {
        prompt: "Synthwave",
        instrumental: false,
        lyrics: "City lights",
      },
      extra_option: true,
    };
    const result = await client.v1.aiMusicGenerator.generate(request, {
      ...(download ? {} : { waitForCompletion: wait, downloadOutputs: false }),
      downloadDirectory: "outputs",
      additionalHeaders: { "x-test": "forwarded" },
    });

    expect(result.id).toBe("music-123");
    expect(result.status).toBe(wait ? "complete" : "queued");
    expect(polls).toBe(wait ? 2 : 1);
    if (download) {
      expect(result.downloadedPaths).toEqual(["music.mp3"]);
      expect(downloadFiles).toHaveBeenCalledWith(result.downloads, "outputs");
    } else {
      expect(downloadFiles).not.toHaveBeenCalled();
    }
  },
);
