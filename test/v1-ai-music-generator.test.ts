import { Client, Environment } from "magic-hour";

describe("tests client.v1.aiMusicGenerator.create", () => {
  test.concurrent(
    "POST /v1/ai-music-generator | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiMusicGenerator
          .create({
            duration: 120,
            name: "My Music Generator audio",
            style: {
              instrumental: false,
              lyrics: "City lights are fading...",
              prompt: "Dreamy synthwave with warm bass and soft vocals",
            },
          })
          .asResponse(),
        client.v1.aiMusicGenerator.create({
          duration: 120,
          name: "My Music Generator audio",
          style: {
            instrumental: false,
            lyrics: "City lights are fading...",
            prompt: "Dreamy synthwave with warm bass and soft vocals",
          },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
