import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiVoiceGenerator.create", () => {
  test.concurrent(
    "POST /v1/ai-voice-generator | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiVoiceGenerator
          .create({
            name: "My Voice Generator audio",
            style: { prompt: "Hello, how are you?", voiceName: "Elon Musk" },
          })
          .asResponse(),
        client.v1.aiVoiceGenerator.create({
          name: "My Voice Generator audio",
          style: { prompt: "Hello, how are you?", voiceName: "Elon Musk" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
