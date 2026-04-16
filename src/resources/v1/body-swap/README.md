# v1.body-swap

## Module Functions

### Body Swap <a name="create"></a>

Swap a person into a scene image using Nano Banana 2. Credits depend on `resolution` (from 100 credits at 640px upward).

**API Endpoint**: `POST /v1/body-swap`

#### Parameters

| Parameter           | Required | Description                                                                                                                                                                                                                                                                                                                                                                | Example                                                                                   |
| ------------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `assets`            |    ✓     | Person image and scene image for body swap                                                                                                                                                                                                                                                                                                                                 | `{"personFilePath": "api-assets/id/1234.png", "sceneFilePath": "api-assets/id/5678.png"}` |
| `└─ personFilePath` |    ✓     | Image of the person to place into the scene. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                                                                |
| `└─ sceneFilePath`  |    ✓     | Target scene image (background). This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.             | `"api-assets/id/5678.png"`                                                                |
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
{"creditsCharged": 100, "frameCost": 100, "id": "cuid-example"}
```
