import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiTalkingPhoto.create", () => {
  test.concurrent(
    "POST /v1/ai-talking-photo | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiTalkingPhoto
          .create({
            assets: {
              audioFilePath: "api-assets/id/1234.mp3",
              imageFilePath: "api-assets/id/1234.png",
            },
            endSeconds: 15.0,
            name: "Talking Photo image",
            startSeconds: 0.0,
            style: { generationMode: "expressive", intensity: 1.5 },
          })
          .asResponse(),
        client.v1.aiTalkingPhoto.create({
          assets: {
            audioFilePath: "api-assets/id/1234.mp3",
            imageFilePath: "api-assets/id/1234.png",
          },
          endSeconds: 15.0,
          name: "Talking Photo image",
          startSeconds: 0.0,
          style: { generationMode: "expressive", intensity: 1.5 },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
