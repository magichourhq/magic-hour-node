# v1.ai-video-editor

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Video Editor Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiVideoEditor.generate(
  {
    assets: { videoFilePath: "/path/to/1234.mp4" },
    endSeconds: 5.0,
    name: "My Video Editor video",
    startSeconds: 0.0,
    style: { prompt: "Change the car color to blue" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Video Editor <a name="create"></a>

**What this API does**

Create the same Video Editor you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.

**Good for**

- Automation and batch processing
- Adding video editor into apps, pipelines, or tools

**How it works (3 steps)**

1. Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
2. Send a request to create a video editor job with the basic fields.
3. Check the job status until it's `complete`, then download the result from `downloads`.

**Key options**

- Inputs: usually a file, sometimes a YouTube link, depending on project type
- Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
- Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt

**Cost**\
Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.

For detailed examples, see the [product page](https://magichour.ai/products/video-editor).

**API Endpoint**: `POST /v1/ai-video-editor`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                      | Example                                       |
| ------------------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for video editing.                                                                                                                                                                                                                                                                                                            | `{"videoFilePath": "api-assets/id/1234.mp4"}` |
| `└─ videoFilePath` |    ✓     | The video to edit. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.mp4"`                    |
| `endSeconds`       |    ✓     | End time of your clip in seconds. Must be greater than `start_seconds`. Duration must be between 3 and 10 seconds.                                                                                                                                                                                                                               | `5.0`                                         |
| `style`            |    ✓     |                                                                                                                                                                                                                                                                                                                                                  | `{"prompt": "Change the car color to blue"}`  |
| `└─ prompt`        |    ✓     | The prompt used to edit the video.                                                                                                                                                                                                                                                                                                               | `"Change the car color to blue"`              |
| `name`             |    ✗     | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                           | `"My Video Editor video"`                     |
| `startSeconds`     |    ✗     | Start time of your clip (seconds). Must be ≥ 0.                                                                                                                                                                                                                                                                                                  | `0.0`                                         |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiVideoEditor.create({
  assets: { videoFilePath: "api-assets/id/1234.mp4" },
  endSeconds: 5.0,
  name: "My Video Editor video",
  startSeconds: 0.0,
  style: { prompt: "Change the car color to blue" },
});
```

#### Response

##### Type

[V1AiVideoEditorCreateResponse](/src/types/v1-ai-video-editor-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
