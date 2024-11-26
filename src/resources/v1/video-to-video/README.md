
### create <a name="create"></a>
Create Video-to-Video

Create a Video To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/video-to-video).
  

**API Endpoint**: `POST /v1/video-to-video`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.videoToVideo.create({
  data: {
    assets: {
      video_file_path: "video/id/1234.mp4",
      video_source: types.PostV1VideoToVideoBodyAssetsVideoSourceEnum.File,
      youtube_url: "http://www.example.com",
    },
    end_seconds: 15,
    fps_resolution: types.PostV1VideoToVideoBodyFpsResolutionEnum.Half,
    height: 960,
    name: "Video To Video video",
    start_seconds: 0,
    style: {
      art_style: types.PostV1VideoToVideoBodyStyleArtStyleEnum._3dRender,
      model: types.PostV1VideoToVideoBodyStyleModelEnum.AbsoluteReality,
      prompt: "string",
      prompt_type:
        types.PostV1VideoToVideoBodyStylePromptTypeEnum.AppendDefault,
      version: types.PostV1VideoToVideoBodyStyleVersionEnum.Default,
    },
    width: 512,
  },
});
```

**Upgrade to see all examples**
