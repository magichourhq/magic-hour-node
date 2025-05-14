
### AI Talking Photo <a name="create"></a>

Create a talking photo from an image and audio or text input.

**API Endpoint**: `POST /v1/ai-talking-photo`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiTalkingPhoto.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    imageFilePath: "api-assets/id/1234.png",
  },
  endSeconds: 15.0,
  name: "Talking Photo image",
  startSeconds: 0.0,
});
```
