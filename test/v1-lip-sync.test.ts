import Client, { Environment } from "magic-hour";

describe("tests client.v1.lipSync.create", () => {
  test.concurrent(
    "POST /v1/lip-sync | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.lipSync
          .create({
            assets: {
              audioFilePath: "api-assets/id/1234.mp3",
              videoFilePath: "api-assets/id/1234.mp4",
              videoSource: "file",
            },
            endSeconds: 15.0,
            height: 960,
            startSeconds: 0.0,
            width: 512,
          })
          .asResponse(),
        client.v1.lipSync.create({
          assets: {
            audioFilePath: "api-assets/id/1234.mp3",
            videoFilePath: "api-assets/id/1234.mp4",
            videoSource: "file",
          },
          endSeconds: 15.0,
          height: 960,
          startSeconds: 0.0,
          width: 512,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
