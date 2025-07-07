import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiHeadshotGenerator.create", () => {
  test.concurrent(
    "POST /v1/ai-headshot-generator | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiHeadshotGenerator
          .create({
            assets: { imageFilePath: "api-assets/id/1234.png" },
            name: "Ai Headshot image",
            style: {
              prompt:
                "professional passport photo, business attire, smiling, good posture, light blue background, centered, plain background",
            },
          })
          .asResponse(),
        client.v1.aiHeadshotGenerator.create({
          assets: { imageFilePath: "api-assets/id/1234.png" },
          name: "Ai Headshot image",
          style: {
            prompt:
              "professional passport photo, business attire, smiling, good posture, light blue background, centered, plain background",
          },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
