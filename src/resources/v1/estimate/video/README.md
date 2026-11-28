# v1.estimate.video

## Module Functions

### Estimate video credits <a name="list"></a>

Get the credits a video create request charges when it is submitted. Pass `tool`, then the fields below that the tool's create request uses, with the same values. Tools billed per frame charge an estimate at submission, assuming 30 fps for an uploaded video, and settle to the frames that render. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.

**API Endpoint**: `GET /v1/estimate/video`

#### Parameters

| Parameter           | Required | Description                                                                                                                                                                                                                                     | Example            |
| ------------------- | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `endSeconds`        |    ✓     | The `end_seconds` of the create request. Used by every tool.                                                                                                                                                                                    | `5.0`              |
| `tool`              |    ✓     | The create endpoint to price, named by its path. For example `image-to-video` for `POST /v1/image-to-video`.                                                                                                                                    | `"image-to-video"` |
| `audio`             |    ✗     | The `audio` of the create request. Used by `image-to-video`, `text-to-video`. Defaults to `false`.                                                                                                                                              | `true`             |
| `hasVideoReference` |    ✗     | Whether any of the create request's `references` is a video. Used by `text-to-video`. Defaults to `false`.                                                                                                                                      | `true`             |
| `model`             |    ✗     | The `model` of the create request. Used by `image-to-video`, `text-to-video`, `ai-ugc-ad`, `ai-video-editor`, `character-replace`.                                                                                                              | `"kling-3.0"`      |
| `resolution`        |    ✗     | The `resolution` of the create request. Used by `image-to-video`, `text-to-video`, `ai-ugc-ad`, `ai-video-editor`, `character-replace`, `audio-to-video`, `ai-video-translator`, `ai-video-upscaler`. `ai-video-translator` defaults to `480p`. | `"720p"`           |
| `startSeconds`      |    ✗     | The `start_seconds` of the create request, for tools whose create request has it. Defaults to 0.                                                                                                                                                | `123.0`            |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.estimate.video.list({
  endSeconds: 5.0,
  tool: "image-to-video",
});
```

#### Response

##### Type

[V1EstimateVideoListResponse](/src/types/v1-estimate-video-list-response.ts)

##### Example

```typescript
{"estimatedCredits": 150}
```
