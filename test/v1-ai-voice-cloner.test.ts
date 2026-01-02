import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiVoiceCloner.create", () => {
  test.concurrent(
    "POST /v1/ai-voice-cloner | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiVoiceCloner
          .create({
            assets: { audioFilePath: "api-assets/id/1234.mp3" },
            name: "Voice Cloner audio",
            style: { prompt: "Hello, this is my cloned voice." },
          })
          .asResponse(),
        client.v1.aiVoiceCloner.create({
          assets: { audioFilePath: "api-assets/id/1234.mp3" },
          name: "Voice Cloner audio",
          style: { prompt: "Hello, this is my cloned voice." },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
