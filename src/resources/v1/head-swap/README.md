# v1.head-swap

## Module Functions

### Head Swap <a name="create"></a>

Swap a head onto a body image. Each image costs 10 credits. Output resolution depends on your subscription; you may set `max_resolution` lower than your plan maximum if desired.

**API Endpoint**: `POST /v1/head-swap`

#### Parameters

| Parameter         | Required | Description                                                                                                                                                                                                                                                                                                                                                           | Example                                                                                |
| ----------------- | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `assets`          |    ✓     | Provide the body and head images for head swap                                                                                                                                                                                                                                                                                                                        | `{"bodyFilePath": "api-assets/id/1234.png", "headFilePath": "api-assets/id/5678.png"}` |
| `└─ bodyFilePath` |    ✓     | Image that receives the swapped head. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.   | `"api-assets/id/1234.png"`                                                             |
| `└─ headFilePath` |    ✓     | Image of the head to place on the body. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/5678.png"`                                                             |
| `maxResolution`   |    ✗     | Constrains the larger dimension (height or width) of the output. Omit to use the maximum allowed for your plan (capped at 2048px). Values above your plan maximum are clamped down to your plan's maximum.                                                                                                                                                            | `1024`                                                                                 |
| `name`            |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                | `"My Head Swap image"`                                                                 |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.headSwap.create({
  assets: {
    bodyFilePath: "api-assets/id/1234.png",
    headFilePath: "api-assets/id/5678.png",
  },
  maxResolution: 1024,
  name: "My Head Swap image",
});
```

#### Response

##### Type

[V1HeadSwapCreateResponse](/src/types/v1-head-swap-create-response.ts)

##### Example

```typescript
{"creditsCharged": 10, "frameCost": 10, "id": "cuid-example"}
```
