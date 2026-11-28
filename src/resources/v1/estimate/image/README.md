# v1.estimate.image

## Module Functions

### Estimate image credits <a name="list"></a>

Get the credits an image create request charges. Pass `tool`, then the fields below that the tool's create request uses, with the same values. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.

**API Endpoint**: `GET /v1/estimate/image`

#### Parameters

| Parameter     | Required | Description                                                                                                                             | Example             |
| ------------- | :------: | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `tool`        |    ✓     | The create endpoint to price, named by its path. For example `ai-image-editor` for `POST /v1/ai-image-editor`.                          | `"ai-image-editor"` |
| `imageCount`  |    ✗     | The `image_count` of the create request. Used by `ai-image-generator`, `ai-image-editor`. Defaults to 1.                                | `4`                 |
| `mode`        |    ✗     | The `style.mode` of the create request. Used by `ai-image-upscaler`. One of `preserve`, `balanced`, `creative`. Defaults to `balanced`. | `"string"`          |
| `model`       |    ✗     | The `model` of the create request. Used by `ai-image-generator`, `ai-image-editor`.                                                     | `"nano-banana-2.1"` |
| `resolution`  |    ✗     | The `resolution` of the create request. Used by `ai-image-generator`, `ai-image-editor`, `body-swap`. One of `640px`, `1k`, `2k`, `4k`. | `"2k"`              |
| `scaleFactor` |    ✗     | The `scale_factor` of the create request. Used by `ai-image-upscaler`. One of `2`, `4`.                                                 | `123.0`             |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.estimate.image.list({ tool: "ai-image-editor" });
```

#### Response

##### Type

[V1EstimateImageListResponse](/src/types/v1-estimate-image-list-response.ts)

##### Example

```typescript
{"estimatedCredits": 150}
```
