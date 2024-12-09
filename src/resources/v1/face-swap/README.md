
### create <a name="create"></a>
Create Face Swap video

Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/face-swap).
  

**API Endpoint**: `POST /v1/face-swap`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.faceSwap.create({
  data: {
    assets: {
      image_file_path: "image/id/1234.png",
      video_file_path: "video/id/1234.mp4",
      video_source: types.PostV1FaceSwapBodyAssetsVideoSourceEnum.File,
      youtube_url: "http://www.example.com",
    },
    end_seconds: 15,
    height: 960,
    name: "Face Swap video",
    start_seconds: 0,
    width: 512,
  },
});
```

**Upgrade to see all examples**
