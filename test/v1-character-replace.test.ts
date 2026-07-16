import { Client, Environment } from "magic-hour";

describe("tests client.v1.characterReplace.create", () => {
  test.concurrent(
    "POST /v1/character-replace | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.characterReplace
          .create({
            assets: {
              imageFilePath: "api-assets/id/5678.png",
              videoFilePath: "api-assets/id/1234.mp4",
            },
            endSeconds: 15.0,
            name: "My Character Replace video",
            resolution: "720p",
            startSeconds: 0.0,
            style: { mode: "replace", selectionMode: "auto" },
          })
          .asResponse(),
        client.v1.characterReplace.create({
          assets: {
            imageFilePath: "api-assets/id/5678.png",
            videoFilePath: "api-assets/id/1234.mp4",
          },
          endSeconds: 15.0,
          name: "My Character Replace video",
          resolution: "720p",
          startSeconds: 0.0,
          style: { mode: "replace", selectionMode: "auto" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
