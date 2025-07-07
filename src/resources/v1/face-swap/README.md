
### Face Swap video <a name="create"></a>

Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/face-swap).
  

**API Endpoint**: `POST /v1/face-swap`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used | `{"imageFilePath": "image/id/1234.png", "videoFilePath": "api-assets/id/1234.mp4", "videoSource": "file"}` |
| `end_seconds` | ✓ | The end time of the input video in seconds | `15.0` |
| `start_seconds` | ✓ | The start time of the input video in seconds | `0.0` |
| `height` | ✗ | Used to determine the dimensions of the output video.     * If height is provided, width will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio. * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.  Note: if the video's original resolution is less than the maximum, the video will not be resized.  See our [pricing page](https://magichour.ai/pricing) for more details. | `960` |
| `name` | ✗ | The name of video | `"Face Swap video"` |
| `width` | ✗ | Used to determine the dimensions of the output video.     * If width is provided, height will also be required. The larger value between width and height will be used to determine the maximum output resolution while maintaining the original aspect ratio. * If both height and width are omitted, the video will be resized according to your subscription's maximum resolution, while preserving aspect ratio.  Note: if the video's original resolution is less than the maximum, the video will not be resized.  See our [pricing page](https://magichour.ai/pricing) for more details. | `512` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceSwap.create({
  assets: {
    imageFilePath: "image/id/1234.png",
    videoFilePath: "api-assets/id/1234.mp4",
    videoSource: "file",
  },
  endSeconds: 15.0,
  height: 960,
  name: "Face Swap video",
  startSeconds: 0.0,
  width: 512,
});

```

#### Response

##### Type
[V1FaceSwapCreateResponse](/src/types/v1-face-swap-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "clx7uu86w0a5qp55yxz315r6r"}`
