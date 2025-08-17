
### Lip Sync <a name="create"></a>

Create a Lip Sync video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](https://magichour.ai/products/lip-sync).
  

**API Endpoint**: `POST /v1/lip-sync`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used | `{"audioFilePath": "api-assets/id/1234.mp3", "videoFilePath": "api-assets/id/1234.mp4", "videoSource": "file"}` |
| `end_seconds` | ✓ | The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds. | `15.0` |
| `start_seconds` | ✓ | The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0. | `0.0` |
| `height` | ✗ | `height` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |
| `max_fps_limit` | ✗ | Defines the maximum FPS (frames per second) for the output video. If the input video's FPS is lower than this limit, the output video will retain the input FPS. This is useful for reducing unnecessary frame usage in scenarios where high FPS is not required. | `12.0` |
| `name` | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Lip Sync video"` |
| `width` | ✗ | `width` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.lipSync.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    videoFilePath: "api-assets/id/1234.mp4",
    videoSource: "file",
  },
  endSeconds: 15.0,
  maxFpsLimit: 12.0,
  name: "Lip Sync video",
  startSeconds: 0.0,
});

```

#### Response

##### Type
[V1LipSyncCreateResponse](/src/types/v1-lip-sync-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
