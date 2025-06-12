
### Image-to-Video <a name="create"></a>

Create a Image To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/image-to-video).
  

**API Endpoint**: `POST /v1/image-to-video`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageToVideo.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  endSeconds: 5.0,
  height: 960,
  name: "Image To Video video",
  style: { prompt: "a dog running" },
  width: 512,
});

```

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for image-to-video. | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `end_seconds` | ✓ | The total duration of the output video in seconds. | `5.0` |
| `style` | ✓ | Attributed used to dictate the style of the output | `{"prompt": "a dog running"}` |
| `height` | ✗ | This field does not affect the output video's resolution. The video's orientation will match that of the input image.  It is retained solely for backward compatibility and will be deprecated in the future. | `960` |
| `name` | ✗ | The name of video | `"Image To Video video"` |
| `width` | ✗ | This field does not affect the output video's resolution. The video's orientation will match that of the input image.  It is retained solely for backward compatibility and will be deprecated in the future. | `512` |
