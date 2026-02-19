# v1.ai-image-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Image Generator Generate Workflow <a name="generate"></a>

The workflow performs the following action

1. upload local assets to Magic Hour storage. So you can pass in a local path instead of having to upload files yourself
2. trigger a generation
3. poll for a completion status. This is configurable
4. if success, download the output to local directory

> [!TIP]
> This is the recommended way to use the SDK unless you have specific needs where it is necessary to split up the actions.

#### Parameters

In addition to the parameters listed in the `create` section below, `generate` introduces 3 new parameters:

- `waitForCompletion` (boolean, default true): Whether to wait for the project to complete.
- `downloadOutputs` (boolean, default true): Whether to download the generated files
- `downloadDirectory` (string, optional): Directory to save downloaded files (defaults to current directory)

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageGenerator.generate(
  {
    aspectRatio: "1:1",
    imageCount: 1,
    model: "default",
    name: "My Ai Image image",
    resolution: "auto",
    style: { prompt: "Cool image", tool: "ai-anime-generator" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Image Generator <a name="create"></a>

Create an AI image with advanced model selection and quality controls.

**API Endpoint**: `POST /v1/ai-image-generator`

#### Parameters

| Parameter        | Required | Deprecated | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                                  |
| ---------------- | :------: | :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `imageCount`     |    ✓     |     ✗      | Number of images to generate. Maximum varies by model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `1`                                                      |
| `style`          |    ✓     |     ✗      | The art style to use for image generation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `{"prompt": "Cool image", "tool": "ai-anime-generator"}` |
| `└─ prompt`      |    ✓     |     —      | The prompt used for the image(s).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"Cool image"`                                           |
| `└─ qualityMode` |    ✗     |     ✓      | DEPRECATED: Use `model` field instead for explicit model selection. Legacy quality mode mapping: - `standard` → `z-image-turbo` model - `pro` → `seedream` model If model is specified, it will take precedence over the legacy quality_mode field.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"pro"`                                                  |
| `└─ tool`        |    ✗     |     —      | The art style to use for image generation. Defaults to 'general' if not provided.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `"ai-anime-generator"`                                   |
| `aspectRatio`    |    ✗     |     ✗      | The aspect ratio of the output image(s). If not specified, defaults to `1:1` (square).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"1:1"`                                                  |
| `model`          |    ✗     |     ✗      | The AI model to use for image generation. Each model has different capabilities and costs. **Models:** - `default` - Use the model we recommend, which will change over time. This is recommended unless you need a specific model. This is the default behavior. - `flux-schnell` - 5 credits/image - Supported resolutions: auto - Available for tiers: free, creator, pro, business - Image count allowed: 1, 2, 3, 4 - `z-image-turbo` - 5 credits/image - Supported resolutions: auto, 2k - Available for tiers: free, creator, pro, business - Image count allowed: 1, 2, 3, 4 - `seedream` - 30 credits/image - Supported resolutions: auto, 2k, 4k - Available for tiers: free, creator, pro, business - Image count allowed: 1, 2, 3, 4 - `nano-banana-pro` - 150 credits/image - Supported resolutions: auto - Available for tiers: creator, pro, business - Image count allowed: 1, 4, 9, 16 | `"default"`                                              |
| `name`           |    ✗     |     ✗      | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `"My Ai Image image"`                                    |
| `orientation`    |    ✗     |     ✓      | DEPRECATED: Use `aspect_ratio` instead. The orientation of the output image(s). `aspect_ratio` takes precedence when `orientation` if both are provided.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `"landscape"`                                            |
| `resolution`     |    ✗     |     ✗      | Maximum resolution for the generated image. **Options:** - `auto` - Automatic resolution (all tiers, default) - `2k` - Up to 2048px (requires Pro or Business tier) - `4k` - Up to 4096px (requires Business tier) Note: Resolution availability depends on the model and your subscription tier. See `model` field for which resolutions each model supports. Defaults to `auto` if not specified.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"auto"`                                                 |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageGenerator.create({
  aspectRatio: "1:1",
  imageCount: 1,
  model: "default",
  name: "My Ai Image image",
  resolution: "auto",
  style: { prompt: "Cool image", tool: "ai-anime-generator" },
});
```

#### Response

##### Type

[V1AiImageGeneratorCreateResponse](/src/types/v1-ai-image-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 5, "frameCost": 5, "id": "cuid-example"}
```
