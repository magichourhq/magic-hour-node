import Client, { Environment } from "magic-hour";

describe("tests client.v1.textToVideo.create", () => {
  test.concurrent(
    "POST /v1/text-to-video | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.textToVideo
          .create({
            endSeconds: 5.0,
            name: "My Text To Video video",
            orientation: "landscape",
            resolution: "720p",
            style: { prompt: "a dog running", qualityMode: "quick" },
          })
          .asResponse(),
        client.v1.textToVideo.create({
          endSeconds: 5.0,
          name: "My Text To Video video",
          orientation: "landscape",
          resolution: "720p",
          style: { prompt: "a dog running", qualityMode: "quick" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
