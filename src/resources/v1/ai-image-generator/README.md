
### AI Images <a name="create"></a>

Create an AI image. Each image costs 5 credits.

**API Endpoint**: `POST /v1/ai-image-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `image_count` | ✓ | number to images to generate | `1` |
| `orientation` | ✓ |  | `"landscape"` |
| `style` | ✓ |  | `{"prompt": "Cool image", "tool": "ai-anime-generator"}` |
| `name` | ✗ | The name of image | `"Ai Image image"` |

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
`{"creditsCharged": 5, "frameCost": 5, "id": "clx7uu86w0a5qp55yxz315r6r"}`
