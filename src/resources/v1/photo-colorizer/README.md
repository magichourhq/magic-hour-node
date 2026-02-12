# v1.photo-colorizer

## Module Functions

<!-- CUSTOM DOCS START -->

### Photo Colorizer Generate Workflow <a name="generate"></a>

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
const res = await client.v1.photoColorizer.generate(
  {
    assets: { imageFilePath: "/path/to/1234.png" },
    name: "Photo Colorizer image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### Photo Colorizer <a name="create"></a>

Colorize image. Each image costs 10 credits.

**API Endpoint**: `POST /v1/photo-colorizer`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                                   | Example                                       |
| ------------------ | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for photo colorization                                                                                                                                                                                                                                                                                                                                     | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` |    ✓     | The image used to generate the colorized image. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                    |
| `name`             |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                        | `"My Photo Colorizer image"`                  |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.photoColorizer.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "My Photo Colorizer image",
});
```

#### Response

##### Type

[V1PhotoColorizerCreateResponse](/src/types/v1-photo-colorizer-create-response.ts)

##### Example

```typescript
{"creditsCharged": 10, "frameCost": 10, "id": "cuid-example"}
```
