import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiPhotoEditor.create", () => {
  test.concurrent(
    "POST /v1/ai-photo-editor | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiPhotoEditor
          .create({
            assets: { imageFilePath: "api-assets/id/1234.png" },
            name: "Photo Editor image",
            resolution: 768,
            style: {
              imageDescription: "A photo of a person",
              likenessStrength: 5.2,
              negativePrompt: "painting, cartoon, sketch",
              prompt: "A photo portrait of a person wearing a hat",
              promptStrength: 3.75,
              steps: 4,
              upscaleFactor: 2,
              upscaleFidelity: 0.5,
            },
          })
          .asResponse(),
        client.v1.aiPhotoEditor.create({
          assets: { imageFilePath: "api-assets/id/1234.png" },
          name: "Photo Editor image",
          resolution: 768,
          style: {
            imageDescription: "A photo of a person",
            likenessStrength: 5.2,
            negativePrompt: "painting, cartoon, sketch",
            prompt: "A photo portrait of a person wearing a hat",
            promptStrength: 3.75,
            steps: 4,
            upscaleFactor: 2,
            upscaleFidelity: 0.5,
          },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
