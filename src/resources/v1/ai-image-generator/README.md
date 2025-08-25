# v1-aiimagegenerator

## Module Functions

<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

### AI Images <a name="create"></a>

Create an AI image. Each image costs 5 credits.

**API Endpoint**: `POST /v1/ai-image-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `imageCount` | ✓ | Number of images to generate. | `1` |
| `orientation` | ✓ | The orientation of the output image(s). | `"landscape"` |
| `style` | ✓ | The art style to use for image generation. | `{"prompt": "Cool image", "tool": "ai-anime-generator"}` |
| `└─ prompt` | ✓ | The prompt used for the image(s). | `"Cool image"` |
| `└─ tool` | ✗ | The art style to use for image generation. Defaults to 'general' if not provided. | `"ai-anime-generator"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Ai Image image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageGenerator.create({
  imageCount: 1,
  name: "Ai Image image",
  orientation: "landscape",
  style: { prompt: "Cool image", tool: "ai-anime-generator" },
});

```

#### Response

##### Type
[V1AiImageGeneratorCreateResponse](/src/types/v1-ai-image-generator-create-response.ts)

##### Example
`{"creditsCharged": 5, "frameCost": 5, "id": "cuid-example"}`

