
### Text-to-Video <a name="create"></a>

Create a Text To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/text-to-video).
  

**API Endpoint**: `POST /v1/text-to-video`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `end_seconds` | ✓ | The total duration of the output video in seconds. | `5.0` |
| `orientation` | ✓ | Determines the orientation of the output video | `"landscape"` |
| `style` | ✓ |  | `{"prompt": "a dog running"}` |
| `name` | ✗ | The name of video | `"Text To Video video"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.textToVideo.create({
  endSeconds: 5.0,
  name: "Text To Video video",
  orientation: "landscape",
  style: { prompt: "a dog running" },
});

```

#### Response

##### Type
[V1TextToVideoCreateResponse](/src/types/v1-text-to-video-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "clx7uu86w0a5qp55yxz315r6r"}`
