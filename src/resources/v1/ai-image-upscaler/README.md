
### AI Image Upscaler <a name="create"></a>

Upscale your image using AI. Each 2x upscale costs 50 credits, and 4x upscale costs 200 credits.

**API Endpoint**: `POST /v1/ai-image-upscaler`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageUpscaler.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Image Upscaler image",
  scaleFactor: 2.0,
  style: { enhancement: "Balanced" },
});

```

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for upscaling | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `scale_factor` | ✓ | How much to scale the image. Must be either 2 or 4 | `2.0` |
| `style` | ✓ |  | `{"enhancement": "Balanced"}` |
| `name` | ✗ | The name of image | `"Image Upscaler image"` |
