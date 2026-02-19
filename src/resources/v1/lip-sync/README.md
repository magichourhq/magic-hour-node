# v1.lip-sync

## Module Functions

<!-- CUSTOM DOCS START -->

### Lip Sync Generate Workflow <a name="generate"></a>

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
const res = await client.v1.lipSync.generate(
  {
    assets: {
      audioFilePath: "/path/to/1234.mp3",
      videoFilePath: "/path/to/1234.mp4",
      videoSource: "file",
    },
    endSeconds: 15.0,
    maxFpsLimit: 12.0,
    name: "Lip Sync video",
    startSeconds: 0.0,
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### Lip Sync <a name="create"></a>

**What this API does**

Create the same Lip Sync you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.

**Good for**

- Automation and batch processing
- Adding lip sync into apps, pipelines, or tools

**How it works (3 steps)**

1. Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
2. Send a request to create a lip sync job with the basic fields.
3. Check the job status until it's `complete`, then download the result from `downloads`.

**Key options**

- Inputs: usually a file, sometimes a YouTube link, depending on project type
- Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
- Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt

**Cost**\
Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.

For detailed examples, see the [product page](https://magichour.ai/products/lip-sync).

**API Endpoint**: `POST /v1/lip-sync`

#### Parameters

| Parameter           | Required | Deprecated | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example                                                                                                         |
| ------------------- | :------: | :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `assets`            |    ✓     |     ✗      | Provide the assets for lip-sync. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used                                                                                                                                                                                                                                                                                                                                                          | `{"audioFilePath": "api-assets/id/1234.mp3", "videoFilePath": "api-assets/id/1234.mp4", "videoSource": "file"}` |
| `└─ audioFilePath`  |    ✓     |     —      | The path of the audio file. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                                                                                                         | `"api-assets/id/1234.mp3"`                                                                                      |
| `└─ videoFilePath`  |    ✗     |     —      | Your video file. Required if `video_source` is `file`. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                                                                              | `"api-assets/id/1234.mp4"`                                                                                      |
| `└─ videoSource`    |    ✓     |     —      | Choose your video source.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `"file"`                                                                                                        |
| `└─ youtubeUrl`     |    ✗     |     —      | YouTube URL (required if `video_source` is `youtube`).                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"http://www.example.com"`                                                                                      |
| `endSeconds`        |    ✓     |     ✗      | End time of your clip (seconds). Must be greater than start_seconds.                                                                                                                                                                                                                                                                                                                                                                                                                              | `15.0`                                                                                                          |
| `startSeconds`      |    ✓     |     ✗      | Start time of your clip (seconds). Must be ≥ 0.                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `0.0`                                                                                                           |
| `height`            |    ✗     |     ✓      | `height` is deprecated and no longer influences the output video's resolution. This field is retained only for backward compatibility and will be removed in a future release.                                                                                                                                                                                                                                                                                                                    | `123`                                                                                                           |
| `maxFpsLimit`       |    ✗     |     ✗      | Defines the maximum FPS (frames per second) for the output video. If the input video's FPS is lower than this limit, the output video will retain the input FPS. This is useful for reducing unnecessary frame usage in scenarios where high FPS is not required.                                                                                                                                                                                                                                 | `12.0`                                                                                                          |
| `name`              |    ✗     |     ✗      | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"My Lip Sync video"`                                                                                           |
| `style`             |    ✗     |     ✗      | Attributes used to dictate the style of the output                                                                                                                                                                                                                                                                                                                                                                                                                                                | `{"generationMode": "lite"}`                                                                                    |
| `└─ generationMode` |    ✗     |     —      | A specific version of our lip sync system, optimized for different needs. _ `lite` - Fast and affordable lip sync - best for simple videos. Costs 1 credit per frame of video. _ `standard` - Natural, accurate lip sync - best for most creators. Costs 1 credit per frame of video. \* `pro` - Premium fidelity with enhanced detail - best for professionals. Costs 2 credits per frame of video. Note: `standard` and `pro` are only available for users on Creator, Pro, and Business tiers. | `"lite"`                                                                                                        |
| `width`             |    ✗     |     ✓      | `width` is deprecated and no longer influences the output video's resolution. This field is retained only for backward compatibility and will be removed in a future release.                                                                                                                                                                                                                                                                                                                     | `123`                                                                                                           |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.lipSync.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    videoFilePath: "api-assets/id/1234.mp4",
    videoSource: "file",
  },
  endSeconds: 15.0,
  maxFpsLimit: 12.0,
  name: "My Lip Sync video",
  startSeconds: 0.0,
});
```

#### Response

##### Type

[V1LipSyncCreateResponse](/src/types/v1-lip-sync-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
