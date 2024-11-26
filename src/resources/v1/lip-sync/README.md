
### create <a name="create"></a>
Create Lip Sync video

Create a Lip Sync video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/lip-sync).
  

**API Endpoint**: `POST /v1/lip-sync`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.lipSync.create({
  data: {
    assets: {
      audio_file_path: "audio/id/1234.mp3",
      video_file_path: "video/id/1234.mp4",
      video_source: types.PostV1LipSyncBodyAssetsVideoSourceEnum.File,
      youtube_url: "http://www.example.com",
    },
    end_seconds: 15,
    height: 960,
    max_fps_limit: 12,
    name: "Lip Sync video",
    start_seconds: 0,
    width: 512,
  },
});
```

**Upgrade to see all examples**
