import Client, { Environment } from "magic-hour";

describe("tests client.v1.aiFaceEditor.create", () => {
  test.concurrent(
    "POST /v1/ai-face-editor | testId: success_default | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.aiFaceEditor
          .create({
            assets: { imageFilePath: "api-assets/id/1234.png" },
            name: "Face Editor image",
            style: {
              enhanceFace: false,
              eyeGazeHorizontal: 0.0,
              eyeGazeVertical: 0.0,
              eyeOpenRatio: 0.0,
              eyebrowDirection: 0.0,
              headPitch: 0.0,
              headRoll: 0.0,
              headYaw: 0.0,
              lipOpenRatio: 0.0,
              mouthGrim: 0.0,
              mouthPositionHorizontal: 0.0,
              mouthPositionVertical: 0.0,
              mouthPout: 0.0,
              mouthPurse: 0.0,
              mouthSmile: 0.0,
            },
          })
          .asResponse(),
        client.v1.aiFaceEditor.create({
          assets: { imageFilePath: "api-assets/id/1234.png" },
          name: "Face Editor image",
          style: {
            enhanceFace: false,
            eyeGazeHorizontal: 0.0,
            eyeGazeVertical: 0.0,
            eyeOpenRatio: 0.0,
            eyebrowDirection: 0.0,
            headPitch: 0.0,
            headRoll: 0.0,
            headYaw: 0.0,
            lipOpenRatio: 0.0,
            mouthGrim: 0.0,
            mouthPositionHorizontal: 0.0,
            mouthPositionVertical: 0.0,
            mouthPout: 0.0,
            mouthPurse: 0.0,
            mouthSmile: 0.0,
          },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
