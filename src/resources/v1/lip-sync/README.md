
### create <a name="create"></a>
Create Lip Sync video

Create a Lip Sync video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](/products/lip-sync).
  

**API Endpoint**: `POST /v1/lip-sync`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.lipSync.create({
  assets: { audioFilePath: "audio/id/1234.mp3", videoSource: "file" },
  endSeconds: 15,
  height: 960,
  startSeconds: 0,
  width: 512,
});
```

**Upgrade to see all examples**
