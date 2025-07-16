import Client, { Environment } from "magic-hour";

describe("tests client.v1.autoSubtitleGenerator.create", () => {
  test.concurrent(
    "POST /v1/auto-subtitle-generator | testId: success_all_params | Success test with response schema validation. Expects status code 200",
    async () => {
      const client = new Client({
        token: "API_TOKEN",
        environment: Environment.MockServer,
      });
      // Get both raw response for status and parsed response for data
      const [rawResponse, response] = await Promise.all([
        client.v1.autoSubtitleGenerator
          .create({
            assets: { videoFilePath: "api-assets/id/1234.mp4" },
            endSeconds: 15.0,
            name: "Auto Subtitle video",
            startSeconds: 0.0,
            style: {
              customConfig: {
                font: "Noto Sans",
                fontSize: 24.0,
                fontStyle: "normal",
                highlightedTextColor: "#FFD700",
                horizontalPosition: "center",
                strokeColor: "#000000",
                strokeWidth: 1.0,
                textColor: "#FFFFFF",
                verticalPosition: "bottom",
              },
              template: "cinematic",
            },
          })
          .asResponse(),
        client.v1.autoSubtitleGenerator.create({
          assets: { videoFilePath: "api-assets/id/1234.mp4" },
          endSeconds: 15.0,
          name: "Auto Subtitle video",
          startSeconds: 0.0,
          style: {
            customConfig: {
              font: "Noto Sans",
              fontSize: 24.0,
              fontStyle: "normal",
              highlightedTextColor: "#FFD700",
              horizontalPosition: "center",
              strokeColor: "#000000",
              strokeWidth: 1.0,
              textColor: "#FFFFFF",
              verticalPosition: "bottom",
            },
            template: "cinematic",
          },
        }),
      ]);
      expect(rawResponse.status).toBe(200); // Exact status code match
      // Response body automatically validated by Zod schema during deserialization
      expect(response).toBeDefined();
    },
  );
});
