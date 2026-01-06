# v1.ai-image-upscaler

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Image Upscaler Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiImageUpscaler.generate(
  {
    assets: { imageFilePath: "/path/to/1234.png" },
    name: "Image Upscaler image",
    scaleFactor: 2.0,
    style: { enhancement: "Balanced" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Image Upscaler <a name="create"></a>

Upscale your image using AI. Each 2x upscale costs 50 credits, and 4x upscale costs 200 credits.

**API Endpoint**: `POST /v1/ai-image-upscaler`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                         | Example                                       |
| ------------------ | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for upscaling                                                                                                                                                                                                                                                                                                                    | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` |    ✓     | The image to upscale. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                    |
| `scaleFactor`      |    ✓     | How much to scale the image. Must be either 2 or 4. Note: 4x upscale is only available on Creator, Pro, or Business tier.                                                                                                                                                                                                                           | `2.0`                                         |
| `style`            |    ✓     |                                                                                                                                                                                                                                                                                                                                                     | `{"enhancement": "Balanced"}`                 |
| `└─ enhancement`   |    ✓     |                                                                                                                                                                                                                                                                                                                                                     | `"Balanced"`                                  |
| `└─ prompt`        |    ✗     | A prompt to guide the final image. This value is ignored if `enhancement` is not Creative                                                                                                                                                                                                                                                           | `"string"`                                    |
| `name`             |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                              | `"My Image Upscaler image"`                   |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiImageUpscaler.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "My Image Upscaler image",
  scaleFactor: 2.0,
  style: { enhancement: "Balanced" },
});
```

#### Response

##### Type

[V1AiImageUpscalerCreateResponse](/src/types/v1-ai-image-upscaler-create-response.ts)

##### Example

```typescript
{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}
```
