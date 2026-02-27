import { Client, Environment } from "magic-hour";

describe("tests client.v1.faceDetection.get", () => {
  test.concurrent(
    "GET /v1/face-detection/{id} | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.faceDetection.get({ id: "uuid-example" }).asResponse(),
        client.v1.faceDetection.get({ id: "uuid-example" }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});

describe("tests client.v1.faceDetection.create", () => {
  test.concurrent(
    "POST /v1/face-detection | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.faceDetection
          .create({
            assets: { targetFilePath: "api-assets/id/1234.png" },
            confidenceScore: 0.5,
          })
          .asResponse(),
        client.v1.faceDetection.create({
          assets: { targetFilePath: "api-assets/id/1234.png" },
          confidenceScore: 0.5,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
