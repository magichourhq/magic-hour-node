import Client, { Environment } from "magic-hour";

describe("tests client.v1.imageProjects.delete", () => {
  test.concurrent(
    "DELETE /v1/image-projects/{id} | testId: generated_success | Empty response test. Expects status code 204",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.imageProjects
          .delete({ id: "cm6pvghix03bvyz0zwash6noj" })
          .asResponse(),
        client.v1.imageProjects.delete({ id: "cm6pvghix03bvyz0zwash6noj" }),
      ]);
      expect(rawResponse.status).toBe(204); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
      expect(response).toBeNull(); // 204 No Content response
    },
  );
});

describe("tests client.v1.imageProjects.get", () => {
  test.concurrent(
    "GET /v1/image-projects/{id} | testId: generated_success | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.imageProjects
          .get({ id: "cm6pvghix03bvyz0zwash6noj" })
          .asResponse(),
        client.v1.imageProjects.get({ id: "cm6pvghix03bvyz0zwash6noj" }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
