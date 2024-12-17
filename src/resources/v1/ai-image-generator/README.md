
### create <a name="create"></a>
Create AI Images

Create an AI image. Each image costs 5 frames.

**API Endpoint**: `POST /v1/ai-image-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiImageGenerator.create({
  imageCount: 1,
  orientation: "landscape",
  style: { prompt: "Cool image" },
});
```

**Upgrade to see all examples**
