
### create <a name="create"></a>
Face Swap video

Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/face-swap).
  

**API Endpoint**: `POST /v1/face-swap`

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
