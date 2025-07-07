import Client, { Environment } from "magic-hour";

describe("tests client.v1.photoColorizer.create", () => {
  test.concurrent(
    "POST /v1/photo-colorizer | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.photoColorizer
          .create({
            assets: { imageFilePath: "api-assets/id/1234.png" },
            name: "Photo Colorizer image",
          })
          .asResponse(),
        client.v1.photoColorizer.create({
          assets: { imageFilePath: "api-assets/id/1234.png" },
          name: "Photo Colorizer image",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
