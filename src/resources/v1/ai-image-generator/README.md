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
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageGenerator.generate(
  {
    imageCount: 1,
    name: "Ai Image image",
    orientation: "landscape",
    style: { prompt: "Cool image", tool: "ai-anime-generator" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

```

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


