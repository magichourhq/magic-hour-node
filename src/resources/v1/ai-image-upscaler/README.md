
### create <a name="create"></a>
Create Upscaled Image

Upscale your image using AI. Each 2x upscale costs 50 frames, and 4x upscale costs 200 frames.

**API Endpoint**: `POST /v1/ai-image-upscaler`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiImageUpscaler.create({
  data: {
    assets: { image_file_path: "image/id/1234.png" },
    name: "Image Upscaler image",
    scale_factor: 123.45,
    style: {
      enhancement: types.PostV1AiImageUpscalerBodyStyleEnhancementEnum.Balanced,
      prompt: "string",
    },
  },
});
```

**Upgrade to see all examples**
