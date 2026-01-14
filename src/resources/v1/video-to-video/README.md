# v1.video-to-video

## Module Functions

<!-- CUSTOM DOCS START -->

### Video To Video Generate Workflow <a name="generate"></a>

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
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.videoToVideo.generate(
  {
    assets: { videoFilePath: "/path/to/1234.mp4", videoSource: "file" },
    endSeconds: 15.0,
    fpsResolution: "HALF",
    name: "Video To Video video",
    startSeconds: 0.0,
    style: {
      artStyle: "3D Render",
      model: "default",
      prompt: "string",
      promptType: "default",
      version: "default",
    },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### Video-to-Video <a name="create"></a>

**What this API does**

Create the same Video To Video you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.

**Good for**

- Automation and batch processing
- Adding video to video into apps, pipelines, or tools

**How it works (3 steps)**

1. Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
2. Send a request to create a video to video job with the basic fields.
3. Check the job status until it's `complete`, then download the result from `downloads`.

**Key options**

- Inputs: usually a file, sometimes a YouTube link, depending on project type
- Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
- Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt

**Cost**\
Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.

For detailed examples, see the [product page](https://magichour.ai/products/video-to-video).

**API Endpoint**: `POST /v1/video-to-video`

#### Parameters

| Parameter          | Required | Deprecated | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Example                                                                                        |
| ------------------ | :------: | :--------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `assets`           |    ✓     |     ✗      | Provide the assets for video-to-video. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used                                                                                                                                                                                                                                                               | `{"videoFilePath": "api-assets/id/1234.mp4", "videoSource": "file"}`                           |
| `└─ videoFilePath` |    ✗     |     —      | Your video file. Required if `video_source` is `file`. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                         | `"api-assets/id/1234.mp4"`                                                                     |
| `└─ videoSource`   |    ✓     |     —      | Choose your video source.                                                                                                                                                                                                                                                                                                                                                                                    | `"file"`                                                                                       |
| `└─ youtubeUrl`    |    ✗     |     —      | YouTube URL (required if `video_source` is `youtube`).                                                                                                                                                                                                                                                                                                                                                       | `"http://www.example.com"`                                                                     |
| `endSeconds`       |    ✓     |     ✗      | End time of your clip (seconds). Must be greater than start_seconds.                                                                                                                                                                                                                                                                                                                                         | `15.0`                                                                                         |
| `startSeconds`     |    ✓     |     ✗      | Start time of your clip (seconds). Must be ≥ 0.                                                                                                                                                                                                                                                                                                                                                              | `0.0`                                                                                          |
| `style`            |    ✓     |     ✗      |                                                                                                                                                                                                                                                                                                                                                                                                              | `{"artStyle": "3D Render", "model": "default", "promptType": "default", "version": "default"}` |
| `└─ artStyle`      |    ✓     |     —      |                                                                                                                                                                                                                                                                                                                                                                                                              | `"3D Render"`                                                                                  |
| `└─ model`         |    ✗     |     —      | * `Dreamshaper` - a good all-around model that works for both animations as well as realism. * `Absolute Reality` - better at realism, but you'll often get similar results with Dreamshaper as well. * `Flat 2D Anime` - best for a flat illustration style that's common in most anime. * `default` - use the default recommended model for the selected art style.                                        | `"default"`                                                                                    |
| `└─ prompt`        |    ✗     |     —      | The prompt used for the video. Prompt is required if `prompt_type` is `custom` or `append_default`. If `prompt_type` is `default`, then the `prompt` value passed will be ignored.                                                                                                                                                                                                                           | `"string"`                                                                                     |
| `└─ promptType`    |    ✗     |     —      | * `default` - Use the default recommended prompt for the art style. * `custom` - Only use the prompt passed in the API. Note: for v1, lora prompt will still be auto added to apply the art style properly. * `append_default` - Add the default recommended prompt to the end of the prompt passed in the API.                                                                                              | `"default"`                                                                                    |
| `└─ version`       |    ✗     |     —      | * `v1` - more detail, closer prompt adherence, and frame-by-frame previews. * `v2` - faster, more consistent, and less noisy. * `default` - use the default version for the selected art style.                                                                                                                                                                                                              | `"default"`                                                                                    |
| `fpsResolution`    |    ✗     |     ✗      | Determines whether the resulting video will have the same frame per second as the original video, or half. * `FULL` - the result video will have the same FPS as the input video * `HALF` - the result video will have half the FPS as the input video                                                                                                                                                       | `"HALF"`                                                                                       |
| `height`           |    ✗     |     ✓      | `height` is deprecated and no longer influences the output video's resolution. Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details. This field is retained only for backward compatibility and will be removed in a future release. | `123`                                                                                          |
| `name`             |    ✗     |     ✗      | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                       | `"My Video To Video video"`                                                                    |
| `width`            |    ✗     |     ✓      | `width` is deprecated and no longer influences the output video's resolution. Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details. This field is retained only for backward compatibility and will be removed in a future release.  | `123`                                                                                          |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.videoToVideo.create({
  assets: { videoFilePath: "api-assets/id/1234.mp4", videoSource: "file" },
  endSeconds: 15.0,
  fpsResolution: "HALF",
  name: "My Video To Video video",
  startSeconds: 0.0,
  style: {
    artStyle: "3D Render",
    model: "default",
    promptType: "default",
    version: "default",
  },
});
```

#### Response

##### Type

[V1VideoToVideoCreateResponse](/src/types/v1-video-to-video-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
