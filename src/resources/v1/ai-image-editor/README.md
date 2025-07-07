
### AI Image Editor <a name="create"></a>

Edit images with AI. Each edit costs 50 credits.

**API Endpoint**: `POST /v1/ai-image-editor`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for image edit | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `style` | ✓ |  | `{"prompt": "Give me sunglasses"}` |
| `name` | ✗ | The name of image | `"Ai Image Editor image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageEditor.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Ai Image Editor image",
  style: { prompt: "Give me sunglasses" },
});

```

#### Response

##### Type
[V1AiImageEditorCreateResponse](/src/types/v1-ai-image-editor-create-response.ts)

##### Example
`{"creditsCharged": 50, "frameCost": 50, "id": "clx7uu86w0a5qp55yxz315r6r"}`
