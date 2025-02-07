
### create <a name="create"></a>
Video-to-Video

Create a Video To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/video-to-video).
  

**API Endpoint**: `POST /v1/video-to-video`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.videoToVideo.create({
  assets: { videoFilePath: "api-assets/id/1234.mp4", videoSource: "file" },
  endSeconds: 15.0,
  height: 960,
  startSeconds: 0.0,
  style: {
    artStyle: "3D Render",
    model: "Absolute Reality",
    prompt: null,
    promptType: "append_default",
    version: "default",
  },
  width: 512,
});
```
