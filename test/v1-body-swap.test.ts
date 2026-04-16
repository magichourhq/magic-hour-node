import { Client, Environment } from "magic-hour";

describe("tests client.v1.bodySwap.create", () => {
  test.concurrent(
    "POST /v1/body-swap | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.bodySwap
          .create({
            assets: {
              personFilePath: "api-assets/id/1234.png",
              sceneFilePath: "api-assets/id/5678.png",
            },
            name: "My Body Swap image",
            resolution: "1k",
          })
          .asResponse(),
        client.v1.bodySwap.create({
          assets: {
            personFilePath: "api-assets/id/1234.png",
            sceneFilePath: "api-assets/id/5678.png",
          },
          name: "My Body Swap image",
          resolution: "1k",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
