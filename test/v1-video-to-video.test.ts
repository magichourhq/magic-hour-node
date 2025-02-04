import Client, { Environment } from "magic-hour";

describe("tests client.v1.videoToVideo.create", () => {
  test.concurrent(
    "POST /v1/video-to-video | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.videoToVideo
          .create({
            assets: { videoFilePath: "video/id/1234.mp4", videoSource: "file" },
            endSeconds: 15.0,
            height: 960,
            startSeconds: 0.0,
            style: {
              artStyle: "3D Render",
              model: "Absolute Reality",
              prompt: null,
              promptType: "append_default",
              version: "default",
            },
            width: 512,
          })
          .asResponse(),
        client.v1.videoToVideo.create({
          assets: { videoFilePath: "video/id/1234.mp4", videoSource: "file" },
          endSeconds: 15.0,
          height: 960,
          startSeconds: 0.0,
          style: {
            artStyle: "3D Render",
            model: "Absolute Reality",
            prompt: null,
            promptType: "append_default",
            version: "default",
          },
          width: 512,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
