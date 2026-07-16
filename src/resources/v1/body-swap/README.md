# v1.body-swap

## Module Functions

<!-- CUSTOM DOCS START -->

### Body Swap Generate Workflow <a name="generate"></a>

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
const res = await client.v1.bodySwap.generate(
  {
    assets: {
      personFilePath: "/path/to/person.png",
      sceneFilePath: "/path/to/scene.png",
    },
    name: "My Body Swap image",
    resolution: "1k",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### Body Swap <a name="create"></a>

Swap a person into a scene image using Nano Banana 2. Credits depend on `resolution` (from 50 credits at 640px upward).

**API Endpoint**: `POST /v1/body-swap`

#### Parameters

| Parameter           | Required | Description                                                                                                                                                                                                                                                                                                                                                                | Example                                                                                   |
| ------------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `assets`            |    ✓     | Person image and scene image for body swap                                                                                                                                                                                                                                                                                                                                 | `{"personFilePath": "api-assets/id/1234.png", "sceneFilePath": "api-assets/id/5678.png"}` |
| `└─ personFilePath` |    ✓     | Image of the person to place into the scene. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                                                                |
| `└─ sceneFilePath`  |    ✓     | Original scene image (background). This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.           | `"api-assets/id/5678.png"`                                                                |
| `resolution`        |    ✓     | Output resolution. Determines credits charged for the run.                                                                                                                                                                                                                                                                                                                 | `"1k"`                                                                                    |
| `name`              |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                     | `"My Body Swap image"`                                                                    |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.bodySwap.create({
  assets: {
    personFilePath: "api-assets/id/1234.png",
    sceneFilePath: "api-assets/id/5678.png",
  },
  name: "My Body Swap image",
  resolution: "1k",
});
```

#### Response

##### Type

[V1BodySwapCreateResponse](/src/types/v1-body-swap-create-response.ts)

##### Example

```typescript
{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}
```
