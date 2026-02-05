# v1.image-background-remover

## Module Functions

<!-- CUSTOM DOCS START -->

### Image Background Remover Generate Workflow <a name="generate"></a>

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
const res = await client.v1.imageBackgroundRemover.generate(
  {
    assets: {
      backgroundImageFilePath: "/path/to/1234.png",
      imageFilePath: "/path/to/1234.png",
    },
    name: "Background Remover image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### Image Background Remover <a name="create"></a>

Remove background from image. Each image costs 5 credits.

**API Endpoint**: `POST /v1/image-background-remover`

#### Parameters

| Parameter                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Example                                                                                            |
| ---------------------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `assets`                     |    ✓     | Provide the assets for background removal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `{"backgroundImageFilePath": "api-assets/id/1234.png", "imageFilePath": "api-assets/id/1234.png"}` |
| `└─ backgroundImageFilePath` |    ✗     | The image used as the new background for the image_file_path. This image will be resized to match the image in image_file_path. Please make sure the resolution between the images are similar. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                                                                         |
| `└─ imageFilePath`           |    ✓     | The image to remove the background. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                                                                                                                             | `"api-assets/id/1234.png"`                                                                         |
| `name`                       |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"My Background Remover image"`                                                                    |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageBackgroundRemover.create({
  assets: {
    backgroundImageFilePath: "api-assets/id/1234.png",
    imageFilePath: "api-assets/id/1234.png",
  },
  name: "My Background Remover image",
});
```

#### Response

##### Type

[V1ImageBackgroundRemoverCreateResponse](/src/types/v1-image-background-remover-create-response.ts)

##### Example

```typescript
{"creditsCharged": 5, "frameCost": 5, "id": "cuid-example"}
```
