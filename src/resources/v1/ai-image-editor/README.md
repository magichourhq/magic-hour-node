# v1.ai-image-editor

## Module Functions



<!-- CUSTOM DOCS START -->
### AI Image Editor Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiImageEditor.generate(
  {
    assets: { imageFilePath: "/path/to/1234.png" },
    name: "Ai Image Editor image",
    style: { prompt: "Give me sunglasses" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

```

<!-- CUSTOM DOCS END -->
### AI Image Editor <a name="create"></a>

Edit images with AI. Each edit costs 50 credits.

**API Endpoint**: `POST /v1/ai-image-editor`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for image edit | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` | ✓ | The image used in the edit. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `style` | ✓ |  | `{"prompt": "Give me sunglasses"}` |
| `└─ prompt` | ✓ | The prompt used to edit the image. | `"Give me sunglasses"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Ai Image Editor image"` |

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
`{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}`


