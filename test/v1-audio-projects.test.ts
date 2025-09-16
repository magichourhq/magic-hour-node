import Client, { Environment } from "magic-hour";

describe("tests client.v1.audioProjects.delete", () => {
  test.concurrent(
    "DELETE /v1/audio-projects/{id} | testId: success_all_params | Empty response test. Expects status code 204",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.audioProjects.delete({ id: "cuid-example" }).asResponse(),
        client.v1.audioProjects.delete({ id: "cuid-example" }),
      ]);
      expect(rawResponse.status).toBe(204); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
      expect(response).toBeNull(); // 204 No Content response
    },
  );
});

describe("tests client.v1.audioProjects.get", () => {
  test.concurrent(
    "GET /v1/audio-projects/{id} | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.audioProjects.get({ id: "cuid-example" }).asResponse(),
        client.v1.audioProjects.get({ id: "cuid-example" }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
