
### create <a name="create"></a>
Create Animation

Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.

**API Endpoint**: `POST /v1/animation`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.animation.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    audioSource: "file",
    imageFilePath: "api-assets/id/1234.png",
  },
  endSeconds: 15,
  fps: 12,
  height: 960,
  style: {
    artStyle: "Painterly Illustration",
    cameraEffect: "Accelerate",
    prompt: "Cyberpunk city",
    promptType: "ai_choose",
    transitionSpeed: 5,
  },
  width: 512,
});
```
