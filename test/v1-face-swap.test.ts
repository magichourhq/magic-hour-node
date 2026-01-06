import Client, { Environment } from "magic-hour";

describe("tests client.v1.faceSwap.create", () => {
  test.concurrent(
    "POST /v1/face-swap | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.faceSwap
          .create({
            assets: {
              faceMappings: [
                {
                  newFace: "api-assets/id/1234.png",
                  originalFace: "api-assets/id/0-0.png",
                },
              ],
              faceSwapMode: "all-faces",
              imageFilePath: "image/id/1234.png",
              videoFilePath: "api-assets/id/1234.mp4",
              videoSource: "file",
              youtubeUrl: "http://www.example.com",
            },
            endSeconds: 15.0,
            height: 123,
            name: "My Face Swap video",
            startSeconds: 0.0,
            style: { version: "default" },
            width: 123,
          })
          .asResponse(),
        client.v1.faceSwap.create({
          assets: {
            faceMappings: [
              {
                newFace: "api-assets/id/1234.png",
                originalFace: "api-assets/id/0-0.png",
              },
            ],
            faceSwapMode: "all-faces",
            imageFilePath: "image/id/1234.png",
            videoFilePath: "api-assets/id/1234.mp4",
            videoSource: "file",
            youtubeUrl: "http://www.example.com",
          },
          endSeconds: 15.0,
          height: 123,
          name: "My Face Swap video",
          startSeconds: 0.0,
          style: { version: "default" },
          width: 123,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
