
### AI Talking Photo <a name="create"></a>

Create a talking photo from an image and audio or text input.

**API Endpoint**: `POST /v1/ai-talking-photo`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for creating a talking photo | `{"audioFilePath": "api-assets/id/1234.mp3", "imageFilePath": "api-assets/id/1234.png"}` |
| `end_seconds` | ✓ | The end time of the input audio in seconds. The maximum duration allowed is 30 seconds. | `15.0` |
| `start_seconds` | ✓ | The start time of the input audio in seconds. The maximum duration allowed is 30 seconds. | `0.0` |
| `name` | ✗ | The name of image | `"Talking Photo image"` |
| `style` | ✗ | Attributes used to dictate the style of the output | `{"generationMode": "expressive", "intensity": 1.5}` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiTalkingPhoto.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    imageFilePath: "api-assets/id/1234.png",
  },
  endSeconds: 15.0,
  name: "Talking Photo image",
  startSeconds: 0.0,
});

```

#### Response

##### Type
[V1AiTalkingPhotoCreateResponse](/src/types/v1-ai-talking-photo-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "clx7uu86w0a5qp55yxz315r6r"}`
