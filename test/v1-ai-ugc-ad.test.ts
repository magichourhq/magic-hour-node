import { Client, Environment } from "magic-hour";

describe("tests client.v1.aiUgcAd.create", () => {
  test.concurrent(
    "POST /v1/ai-ugc-ad | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiUgcAd
          .create({
            assets: { imageFilePath: "api-assets/id/image.jpg" },
            endSeconds: 4.0,
            model: "kling-3.0",
            resolution: "1080p",
            script: "Meet your new everyday essential.",
          })
          .asResponse(),
        client.v1.aiUgcAd.create({
          assets: { imageFilePath: "api-assets/id/image.jpg" },
          endSeconds: 4.0,
          model: "kling-3.0",
          resolution: "1080p",
          script: "Meet your new everyday essential.",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
