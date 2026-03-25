import { Client, Environment } from "magic-hour";

describe("tests client.v1.headSwap.create", () => {
  test.concurrent(
    "POST /v1/head-swap | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.headSwap
          .create({
            assets: {
              bodyFilePath: "api-assets/id/1234.png",
              headFilePath: "api-assets/id/5678.png",
            },
            maxResolution: 1024,
            name: "My Head Swap image",
          })
          .asResponse(),
        client.v1.headSwap.create({
          assets: {
            bodyFilePath: "api-assets/id/1234.png",
            headFilePath: "api-assets/id/5678.png",
          },
          maxResolution: 1024,
          name: "My Head Swap image",
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
