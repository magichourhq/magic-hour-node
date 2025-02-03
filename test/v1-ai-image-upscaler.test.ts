import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiImageUpscaler.create", () => {
  test.concurrent(
    "POST /v1/ai-image-upscaler | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiImageUpscaler
          .create({
            assets: { imageFilePath: "image/id/1234.png" },
            scaleFactor: 123.45,
            style: { enhancement: "Balanced" },
          })
          .asResponse(),
        client.v1.aiImageUpscaler.create({
          assets: { imageFilePath: "image/id/1234.png" },
          scaleFactor: 123.45,
          style: { enhancement: "Balanced" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
