
### Animation <a name="create"></a>

Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.

**API Endpoint**: `POST /v1/animation`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for animation. | `{"audioFilePath": "api-assets/id/1234.mp3", "audioSource": "file", "imageFilePath": "api-assets/id/1234.png"}` |
| `end_seconds` | ✓ | This value determines the duration of the output video. | `15.0` |
| `fps` | ✓ | The desire output video frame rate | `12.0` |
| `height` | ✓ | The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `960` |
| `style` | ✓ | Defines the style of the output video | `{"artStyle": "Painterly Illustration", "cameraEffect": "Simple Zoom In", "prompt": "Cyberpunk city", "promptType": "custom", "transitionSpeed": 5}` |
| `width` | ✓ | The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `512` |
| `name` | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Animation video"` |

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
  endSeconds: 15.0,
  fps: 12.0,
  height: 960,
  name: "Animation video",
  style: {
    artStyle: "Painterly Illustration",
    cameraEffect: "Simple Zoom In",
    prompt: "Cyberpunk city",
    promptType: "custom",
    transitionSpeed: 5,
  },
  width: 512,
});

```

#### Response

##### Type
[V1AnimationCreateResponse](/src/types/v1-animation-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
