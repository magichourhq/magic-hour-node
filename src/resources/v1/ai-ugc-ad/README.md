# v1.ai-ugc-ad

## Module Functions

### AI UGC Ad Generator <a name="create"></a>

Create a spoken UGC video from a prepared image and script. Returns a project ID; poll GET /v1/video-projects/{id} for status and downloads. To compose an image, generate the image separately with the Image Editor API and supply its download URL.

**API Endpoint**: `POST /v1/ai-ugc-ad`

#### Parameters

| Parameter              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Example                                        |
| ---------------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `assets`               |    ✓     |                                                                                                                                                                                                                                                                                                                                                                                                             | `{"imageFilePath": "api-assets/id/image.jpg"}` |
| `└─ imageFilePath`     |    ✓     | Prepared image to animate. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                    | `"api-assets/id/image.jpg"`                    |
| `endSeconds`           |    ✓     | Video duration in seconds. Supported values by model: * kling-3.0: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 seconds. * ltx-2.5: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 seconds. * veo3.1: 4, 6, 8, 15, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 120, 127, 134, 141 seconds. Free plans are limited to 5 seconds unless a credit pack has been purchased. | `4.0`                                          |
| `script`               |    ✓     | The words the actor should speak. Character limits apply after trimming: * kling-3.0: 2500 characters. * ltx-2.5: 1804 characters. * veo3.1: 2500 characters. LTX's dialogue wrapper counts toward its model prompt limit.                                                                                                                                                                                  | `"Meet your new everyday essential."`          |
| `additionalProperties` |    ✗     |                                                                                                                                                                                                                                                                                                                                                                                                             | `{}`                                           |
| `model`                |    ✗     | Defaults to kling-3.0 on paid plans and ltx-2.5 on free plans.                                                                                                                                                                                                                                                                                                                                              | `"kling-3.0"`                                  |
| `resolution`           |    ✗     | Defaults to 720p on paid plans and 480p on free plans. Unsupported model/resolution combinations and resolutions unavailable for your plan are rejected.                                                                                                                                                                                                                                                    | `"1080p"`                                      |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiUgcAd.create({
  assets: { imageFilePath: "api-assets/id/image.jpg" },
  endSeconds: 4.0,
  script: "Meet your new everyday essential.",
});
```

#### Response

##### Type

[V1AiUgcAdCreateResponse](/src/types/v1-ai-ugc-ad-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 123, "id": "cuid-example"}
```
