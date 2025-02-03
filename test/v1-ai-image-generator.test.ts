import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiImageGenerator.create", () => {
  test.concurrent(
    "POST /v1/ai-image-generator | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiImageGenerator
          .create({
            imageCount: 1,
            orientation: "landscape",
            style: { prompt: "Cool image" },
          })
          .asResponse(),
        client.v1.aiImageGenerator.create({
          imageCount: 1,
          orientation: "landscape",
          style: { prompt: "Cool image" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
