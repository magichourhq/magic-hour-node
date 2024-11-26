
### create <a name="create"></a>
Create Text-to-Video

Create a Text To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/text-to-video).
  

**API Endpoint**: `POST /v1/text-to-video`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.textToVideo.create({
  data: {
    end_seconds: 5,
    name: "Text To Video video",
    orientation: types.PostV1TextToVideoBodyOrientationEnum.Landscape,
    style: { prompt: "string" },
  },
});
```

**Upgrade to see all examples**