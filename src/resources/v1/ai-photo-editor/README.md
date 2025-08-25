# v1-aiphotoeditor

## Module Functions
### AI Photo Editor <a name="create"></a>

> **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API. 

Edit photo using AI. Each photo costs 10 credits.

**API Endpoint**: `POST /v1/ai-photo-editor`

#### Parameters

| Parameter | Required | Deprecated | Description | Example |
|-----------|:--------:|:----------:|-------------|--------|
| `assets` | ✓ | ✗ | Provide the assets for photo editor | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` | ✓ | — | The image used to generate the output. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `resolution` | ✓ | ✗ | The resolution of the final output image. The allowed value is based on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `768` |
| `style` | ✓ | ✗ |  | `{"imageDescription": "A photo of a person", "likenessStrength": 5.2, "negativePrompt": "painting, cartoon, sketch", "prompt": "A photo portrait of a person wearing a hat", "promptStrength": 3.75, "steps": 4, "upscaleFactor": 2, "upscaleFidelity": 0.5}` |
| `└─ imageDescription` | ✓ | — | Use this to describe what your input image is. This helps maintain aspects of the image you don't want to change. | `"A photo of a person"` |
| `└─ likenessStrength` | ✓ | — | Determines the input image's influence. Higher values align the output more with the initial image. | `5.2` |
| `└─ negativePrompt` | ✗ | — | What you want to avoid seeing in the final output; has a minor effect. | `"painting, cartoon, sketch"` |
| `└─ prompt` | ✓ | — | What you want your final output to look like. We recommend starting with the image description and making minor edits for best results. | `"A photo portrait of a person wearing a hat"` |
| `└─ promptStrength` | ✓ | — | Determines the prompt's influence. Higher values align the output more with the prompt. | `3.75` |
| `└─ steps` | ✗ | — | Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time. | `4` |
| `└─ upscaleFactor` | ✗ | — | The multiplier applied to an image's original dimensions during the upscaling process. For example, a scale of 2 doubles the width and height (e.g., from 512x512 to 1024x1024). | `2` |
| `└─ upscaleFidelity` | ✗ | — | Upscale fidelity refers to the level of quality desired in the generated image. Fidelity value of 1 means more details. | `0.5` |
| `name` | ✗ | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Photo Editor image"` |
| `steps` | ✗ | ✓ | Deprecated: Please use `.style.steps` instead. Number of iterations used to generate the output. Higher values improve quality and increase the strength of the prompt but increase processing time. | `123` |

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
<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

