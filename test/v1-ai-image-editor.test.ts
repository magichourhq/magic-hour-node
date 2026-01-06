import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiImageEditor.create", () => {
  test.concurrent(
    "POST /v1/ai-image-editor | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiImageEditor
          .create({
            assets: {
              imageFilePath: "api-assets/id/1234.png",
              imageFilePaths: [
                "api-assets/id/1234.png",
                "api-assets/id/1235.png",
              ],
            },
            name: "My Ai Image Editor image",
            style: { model: "Nano Banana", prompt: "Give me sunglasses" },
          })
          .asResponse(),
        client.v1.aiImageEditor.create({
          assets: {
            imageFilePath: "api-assets/id/1234.png",
            imageFilePaths: [
              "api-assets/id/1234.png",
              "api-assets/id/1235.png",
            ],
          },
          name: "My Ai Image Editor image",
          style: { model: "Nano Banana", prompt: "Give me sunglasses" },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
