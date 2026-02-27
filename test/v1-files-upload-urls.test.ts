import { Client, Environment } from "magic-hour";

describe("tests client.v1.files.uploadUrls.create", () => {
  test.concurrent(
    "POST /v1/files/upload-urls | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.files.uploadUrls
          .create({
            items: [
              { extension: "mp4", type: "video" },
              { extension: "mp3", type: "audio" },
            ],
          })
          .asResponse(),
        client.v1.files.uploadUrls.create({
          items: [
            { extension: "mp4", type: "video" },
            { extension: "mp3", type: "audio" },
          ],
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
