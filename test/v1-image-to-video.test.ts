import Client, { Environment } from "magic-hour";

describe("tests client.v1.imageToVideo.create", () => {
  test.concurrent(
    "POST /v1/image-to-video | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.imageToVideo
          .create({
            assets: { imageFilePath: "api-assets/id/1234.png" },
            endSeconds: 5.0,
            height: 123,
            name: "Image To Video video",
            resolution: "1080p",
            style: {
              highQuality: true,
              prompt: "a dog running",
              qualityMode: "quick",
            },
            width: 123,
          })
          .asResponse(),
        client.v1.imageToVideo.create({
          assets: { imageFilePath: "api-assets/id/1234.png" },
          endSeconds: 5.0,
          height: 123,
          name: "Image To Video video",
          resolution: "1080p",
          style: {
            highQuality: true,
            prompt: "a dog running",
            qualityMode: "quick",
          },
          width: 123,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
