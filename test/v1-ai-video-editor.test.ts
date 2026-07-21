import { Client, Environment } from "magic-hour";

describe("tests client.v1.aiVideoEditor.create", () => {
  test.concurrent(
    "POST /v1/ai-video-editor | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiVideoEditor
          .create({
            assets: { videoFilePath: "api-assets/id/1234.mp4" },
            endSeconds: 5.0,
            model: "gemini-omni",
            name: "My Video Editor video",
            resolution: "720p",
            startSeconds: 0.0,
            style: { prompt: "Change the car color to blue" },
          })
          .asResponse(),
        client.v1.aiVideoEditor.create({
          assets: { videoFilePath: "api-assets/id/1234.mp4" },
          endSeconds: 5.0,
          model: "gemini-omni",
          name: "My Video Editor video",
          resolution: "720p",
          startSeconds: 0.0,
          style: { prompt: "Change the car color to blue" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
