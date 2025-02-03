import Client, { Environment } from "magic-hour";

describe("tests client.v1.faceSwap.create", () => {
  test.concurrent(
    "POST /v1/face-swap | testId: success_default | Success test with response schema validation. Expects status code 200",
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
              imageFilePath: "image/id/1234.png",
              videoFilePath: "video/id/1234.mp4",
              videoSource: "file",
            },
            endSeconds: 15,
            height: 960,
            startSeconds: 0,
            width: 512,
          })
          .asResponse(),
        client.v1.faceSwap.create({
          assets: {
            imageFilePath: "image/id/1234.png",
            videoFilePath: "video/id/1234.mp4",
            videoSource: "file",
          },
          endSeconds: 15,
          height: 960,
          startSeconds: 0,
          width: 512,
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
