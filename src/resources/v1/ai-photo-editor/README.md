
### AI Photo Editor <a name="create"></a>

> **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API. 

Edit photo using AI. Each photo costs 10 credits.

**API Endpoint**: `POST /v1/ai-photo-editor`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for photo editor | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `resolution` | ✓ | The resolution of the final output image. The allowed value is based on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `768` |
| `style` | ✓ |  | `{"imageDescription": "A photo of a person", "likenessStrength": 5.2, "negativePrompt": "painting, cartoon, sketch", "prompt": "A photo portrait of a person wearing a hat", "promptStrength": 3.75, "steps": 4, "upscaleFactor": 2, "upscaleFidelity": 0.5}` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Photo Editor image"` |
| `steps` | ✗ | Deprecated: Please use `.style.steps` instead. Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time. | `123` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiPhotoEditor.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Photo Editor image",
  resolution: 768,
  style: {
    imageDescription: "A photo of a person",
    likenessStrength: 5.2,
    negativePrompt: "painting, cartoon, sketch",
    prompt: "A photo portrait of a person wearing a hat",
    promptStrength: 3.75,
    steps: 4,
    upscaleFactor: 2,
    upscaleFidelity: 0.5,
  },
});

```

#### Response

##### Type
[V1AiPhotoEditorCreateResponse](/src/types/v1-ai-photo-editor-create-response.ts)

##### Example
`{"creditsCharged": 10, "frameCost": 10, "id": "cuid-example"}`
