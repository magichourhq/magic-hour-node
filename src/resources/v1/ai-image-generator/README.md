
### create <a name="create"></a>
Create AI Images

Create an AI image. Each image costs 5 frames.

**API Endpoint**: `POST /v1/ai-image-generator`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiImageGenerator.create({
  data: {
    image_count: 1,
    name: "Ai Image image",
    orientation: types.PostV1AiImageGeneratorBodyOrientationEnum.Landscape,
    style: { prompt: "Cool image" },
  },
});
```

**Upgrade to see all examples**
