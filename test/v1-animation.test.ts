import Client, { Environment } from "magic-hour";

describe("tests client.v1.animation.create", () => {
  test.concurrent(
    "POST /v1/animation | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.animation
          .create({
            assets: {
              audioFilePath: "api-assets/id/1234.mp3",
              audioSource: "file",
              imageFilePath: "api-assets/id/1234.png",
              youtubeUrl: "http://www.example.com",
            },
            endSeconds: 15.0,
            fps: 12.0,
            height: 960,
            name: "Animation video",
            style: {
              artStyle: "Painterly Illustration",
              artStyleCustom: "string",
              cameraEffect: "Accelerate",
              prompt: "Cyberpunk city",
              promptType: "ai_choose",
              transitionSpeed: 5,
            },
            width: 512,
          })
          .asResponse(),
        client.v1.animation.create({
          assets: {
            audioFilePath: "api-assets/id/1234.mp3",
            audioSource: "file",
            imageFilePath: "api-assets/id/1234.png",
            youtubeUrl: "http://www.example.com",
          },
          endSeconds: 15.0,
          fps: 12.0,
          height: 960,
          name: "Animation video",
          style: {
            artStyle: "Painterly Illustration",
            artStyleCustom: "string",
            cameraEffect: "Accelerate",
            prompt: "Cyberpunk city",
            promptType: "ai_choose",
            transitionSpeed: 5,
          },
          width: 512,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
