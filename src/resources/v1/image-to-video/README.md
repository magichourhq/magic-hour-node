
### Image-to-Video <a name="create"></a>

Create a Image To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](https://magichour.ai/products/image-to-video).
  

**API Endpoint**: `POST /v1/image-to-video`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for image-to-video. | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `end_seconds` | ✓ | The total duration of the output video in seconds. | `5.0` |
| `height` | ✗ | `height` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |
| `name` | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Image To Video video"` |
| `resolution` | ✗ | Controls the output video resolution. Defaults to `720p` if not specified.  480p and 720p are available on Creator, Pro, or Business tiers. However, 1080p require Pro or Business tier.  **Options:** - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds. - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds. - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds. | `"720p"` |
| `style` | ✗ | Attributed used to dictate the style of the output | `{"prompt": "a dog running"}` |
| `width` | ✗ | `width` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageToVideo.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  endSeconds: 5.0,
  name: "Image To Video video",
  resolution: "720p",
});

```

#### Response

##### Type
[V1ImageToVideoCreateResponse](/src/types/v1-image-to-video-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
