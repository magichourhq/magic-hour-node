import Client, { Environment } from "magic-hour";

describe("tests client.v1.videoToVideo.create", () => {
  test.concurrent(
    "POST /v1/video-to-video | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.videoToVideo
          .create({
            assets: {
              videoFilePath: "api-assets/id/1234.mp4",
              videoSource: "file",
              youtubeUrl: "http://www.example.com",
            },
            endSeconds: 15.0,
            fpsResolution: "HALF",
            height: 123,
            name: "My Video To Video video",
            startSeconds: 0.0,
            style: {
              artStyle: "3D Render",
              model: "default",
              prompt: "string",
              promptType: "default",
              version: "default",
            },
            width: 123,
          })
          .asResponse(),
        client.v1.videoToVideo.create({
          assets: {
            videoFilePath: "api-assets/id/1234.mp4",
            videoSource: "file",
            youtubeUrl: "http://www.example.com",
          },
          endSeconds: 15.0,
          fpsResolution: "HALF",
          height: 123,
          name: "My Video To Video video",
          startSeconds: 0.0,
          style: {
            artStyle: "3D Render",
            model: "default",
            prompt: "string",
            promptType: "default",
            version: "default",
          },
          width: 123,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
