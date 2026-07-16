# v1.character-replace

## Module Functions

<!-- CUSTOM DOCS START -->

### Character Replace Generate Workflow <a name="generate"></a>

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
const res = await client.v1.characterReplace.generate(
  {
    assets: {
      imageFilePath: "/path/to/5678.png",
      videoFilePath: "/path/to/1234.mp4",
    },
    endSeconds: 15.0,
    name: "My Character Replace video",
    resolution: "720p",
    startSeconds: 0.0,
    style: { mode: "replace", selectionMode: "auto" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### Character Replace <a name="create"></a>

**What this API does**

Create the same Character Replace you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.

**Good for**

- Automation and batch processing
- Adding character replace into apps, pipelines, or tools

**How it works (3 steps)**

1. Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
2. Send a request to create a character replace job with the basic fields.
3. Check the job status until it's `complete`, then download the result from `downloads`.

**Key options**

- Inputs: usually a file, sometimes a YouTube link, depending on project type
- Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
- Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt

**Cost**\
Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.

For detailed examples, see the [product page](https://magichour.ai/products/character-replace).

**API Endpoint**: `POST /v1/character-replace`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                          | Example                                                                                  |
| ------------------ | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `assets`           |    ✓     | Source video and reference character image for the job.                                                                                                                                                                                                                                                                                                                                              | `{"imageFilePath": "api-assets/id/5678.png", "videoFilePath": "api-assets/id/1234.mp4"}` |
| `└─ imageFilePath` |    ✓     | Reference character image used as the replacement or animation target. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/5678.png"`                                                               |
| `└─ videoFilePath` |    ✓     | Source video containing the subject to replace or animate. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.             | `"api-assets/id/1234.mp4"`                                                               |
| `endSeconds`       |    ✓     | End time of your clip (seconds). Must be greater than start_seconds.                                                                                                                                                                                                                                                                                                                                 | `15.0`                                                                                   |
| `name`             |    ✗     | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                               | `"My Character Replace video"`                                                           |
| `resolution`       |    ✗     | Output video resolution. Defaults to 480p, the lowest resolution available on your plan.                                                                                                                                                                                                                                                                                                             | `"720p"`                                                                                 |
| `startSeconds`     |    ✗     | Start time of your clip (seconds). Must be ≥ 0.                                                                                                                                                                                                                                                                                                                                                      | `0.0`                                                                                    |
| `style`            |    ✗     | Optional style controls for replace vs animate mode and subject selection.                                                                                                                                                                                                                                                                                                                           | `{"mode": "replace", "selectionMode": "auto"}`                                           |
| `└─ mode`          |    ✗     | Processing mode. `replace` swaps the detected subject with your reference character. `animate` transfers motion from the video onto your character image.                                                                                                                                                                                                                                            | `"replace"`                                                                              |
| `└─ points`        |    ✗     | On-frame markers for manual subject selection. Required when `selection_mode` is `point`. Ignored when `selection_mode` is `auto` or omitted.                                                                                                                                                                                                                                                        | `[{"positionX": 320, "positionY": 180, "timeSeconds": 2.5}]`                             |
| `└─ selectionMode` |    ✗     | How to locate the subject in the source video. `auto` detects a person automatically. `point` uses your `points` to mark the subject. Defaults to `auto`.                                                                                                                                                                                                                                            | `"auto"`                                                                                 |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.characterReplace.create({
  assets: {
    imageFilePath: "api-assets/id/5678.png",
    videoFilePath: "api-assets/id/1234.mp4",
  },
  endSeconds: 15.0,
  name: "My Character Replace video",
  resolution: "720p",
  startSeconds: 0.0,
});
```

#### Response

##### Type

[V1CharacterReplaceCreateResponse](/src/types/v1-character-replace-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
