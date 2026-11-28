import { Client, Environment } from "magic-hour";

describe("tests client.v1.estimate.video.list", () => {
  test.concurrent(
    "GET /v1/estimate/video | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.estimate.video
          .list({
            endSeconds: 5.0,
            tool: "image-to-video",
            audio: true,
            hasVideoReference: true,
            model: "kling-3.0",
            resolution: "720p",
            startSeconds: 123.45,
          })
          .asResponse(),
        client.v1.estimate.video.list({
          endSeconds: 5.0,
          tool: "image-to-video",
          audio: true,
          hasVideoReference: true,
          model: "kling-3.0",
          resolution: "720p",
          startSeconds: 123.45,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
  test.concurrent(
    "GET /v1/estimate/video | testId: success_required_only | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.estimate.video
          .list({ endSeconds: 5.0, tool: "image-to-video" })
          .asResponse(),
        client.v1.estimate.video.list({
          endSeconds: 5.0,
          tool: "image-to-video",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
