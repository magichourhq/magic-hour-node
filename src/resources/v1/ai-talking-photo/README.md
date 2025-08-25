# v1-aitalkingphoto

## Module Functions
### AI Talking Photo <a name="create"></a>

Create a talking photo from an image and audio or text input.

**API Endpoint**: `POST /v1/ai-talking-photo`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for creating a talking photo | `{"audioFilePath": "api-assets/id/1234.mp3", "imageFilePath": "api-assets/id/1234.png"}` |
| `└─ audioFilePath` | ✓ | The audio file to sync with the image. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.mp3"` |
| `└─ imageFilePath` | ✓ | The source image to animate. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `endSeconds` | ✓ | The end time of the input audio in seconds. The maximum duration allowed is 60 seconds. | `15.0` |
| `startSeconds` | ✓ | The start time of the input audio in seconds. The maximum duration allowed is 60 seconds. | `0.0` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Talking Photo image"` |
| `style` | ✗ | Attributes used to dictate the style of the output | `{"generationMode": "expressive", "intensity": 1.5}` |
| `└─ generationMode` | ✗ | Controls overall motion style. * `expressive` - More motion and facial expressiveness; may introduce visual artifacts. * `stable` -  Reduced motion for cleaner output; may result in minimal animation. | `"expressive"` |
| `└─ intensity` | ✗ | Note: this value is only applicable when generation_mode is `expressive`. The value can include up to 2 decimal places. * Lower values yield more stability but can suppress mouth movement. * Higher values increase motion and expressiveness, with a higher risk of distortion. | `1.5` |

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
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`

