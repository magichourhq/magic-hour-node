# v1.image-to-video

## Module Functions

<!-- CUSTOM DOCS START -->

### Image To Video Generate Workflow <a name="generate"></a>

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
const res = await client.v1.imageToVideo.generate(
  {
    assets: { imageFilePath: "/path/to/1234.png" },
    endSeconds: 5.0,
    name: "Image To Video video",
    resolution: "720p",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### Image-to-Video <a name="create"></a>

**What this API does**

Create the same Image To Video you can make in the browser, but programmatically, so you can automate it, run it at scale, or connect it to your own app or workflow.

**Good for**

- Automation and batch processing
- Adding image to video into apps, pipelines, or tools

**How it works (3 steps)**

1. Upload your inputs (video, image, or audio) with [Generate Upload URLs](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls) and copy the `file_path`.
2. Send a request to create a image to video job with the basic fields.
3. Check the job status until it's `complete`, then download the result from `downloads`.

**Key options**

- Inputs: usually a file, sometimes a YouTube link, depending on project type
- Resolution: free users are limited to 576px; higher plans unlock HD and larger sizes
- Extra fields: e.g. `face_swap_mode`, `start_seconds`/`end_seconds`, or a text prompt

**Cost**\
Credits are only charged for the frames that actually render. You'll see an estimate when the job is queued, and the final total after it's done.

For detailed examples, see the [product page](https://magichour.ai/products/image-to-video).

**API Endpoint**: `POST /v1/image-to-video`

#### Parameters

| Parameter          | Required | Deprecated | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example                                       |
| ------------------ | :------: | :--------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `assets`           |    ✓     |     ✗      | Provide the assets for image-to-video. Sora 2 only supports images with an aspect ratio of `9:16` or `16:9`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` |    ✓     |     —      | The path of the image file. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"api-assets/id/1234.png"`                    |
| `endSeconds`       |    ✓     |     ✗      | The total duration of the output video in seconds. Supported durations depend on the chosen model: _ **`ltx-2`**: 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30 _ **`seedance`**: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 _ **`kling-2.5`**: 5, 10 _ **`kling-3.0`**: 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 _ **`sora-2`**: 4, 8, 12, 24, 36, 48, 60 _ **`veo3.1`**: 4, 6, 8, 16, 24, 32, 40, 48, 56 Legacy models: \* **`kling-1.6`**: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60                                                                                                                                                                                                                                                                                                                                 | `5.0`                                         |
| `audio`            |    ✗     |     ✗      | Whether to include audio in the video. Defaults to `false` if not specified. Audio support varies by model: _ **`ltx-2`**: Automatically included with no extra credits _ **`seedance`**: Not supported _ **`kling-2.5`**: Automatically included with no extra credits _ **`kling-3.0`**: Toggle-able (can enable/disable) _ **`sora-2`**: Automatically included with no extra credits _ **`veo3.1`**: Toggle-able (can enable/disable) \* **`kling-1.6`**: Not supported                                                                                                                                                                                                                                                                                                                                      | `true`                                        |
| `height`           |    ✗     |     ✓      | `height` is deprecated and no longer influences the output video's resolution. This field is retained only for backward compatibility and will be removed in a future release.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `123`                                         |
| `model`            |    ✗     |     ✗      | The AI model to use for video generation. _ `default`: uses our currently recommended model for general use. For paid tiers, defaults to `kling-2.5`. For free tiers, it defaults to `ltx-2`. _ `ltx-2`: Great for fast iteration with audio, lip-sync, and expressive faces _ `seedance`: Great for fast iteration and start/end frame _ `kling-2.5`: Great for motion, action, and camera control _ `kling-3.0`: Great for cinematic, multi-scene storytelling with control _ `sora-2`: Great for story-telling, dialogue & creativity _ `veo3.1`: Great for realism, polish, & prompt adherence Legacy models: _ `kling-1.6`: Great for dependable clips with smooth motion If you specify the deprecated model value that includes the `-audio` suffix, this will be the same as included `audio` as `true`. | `"kling-2.5-audio"`                           |
| `name`             |    ✗     |     ✗      | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"My Image To Video video"`                   |
| `resolution`       |    ✗     |     ✗      | Controls the output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers. _ **`ltx-2`**: Supports 480p, 720p, 1080p. _ **`seedance`**: Supports 480p, 720p, 1080p. _ **`kling-2.5`**: Supports 720p, 1080p. _ **`kling-3.0`**: Supports 720p, 1080p. _ **`sora-2`**: Supports 720p. _ **`veo3.1`**: Supports 720p, 1080p. \* **`kling-1.6`**: Supports 720p, 1080p.                                                                                                                                                                                                                                                                                                                                                                                                                       | `"720p"`                                      |
| `style`            |    ✗     |     ✗      | Attributed used to dictate the style of the output                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `{"prompt": "a dog running"}`                 |
| `└─ highQuality`   |    ✗     |     ✓      | Deprecated: Please use `resolution` instead. For backward compatibility, _ `false` maps to 720p resolution _ `true` maps to 1080p resolution This field will be removed in a future version. Use the `resolution` field to directly specify the resolution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `true`                                        |
| `└─ prompt`        |    ✗     |     —      | The prompt used for the video.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"a dog running"`                             |
| `└─ qualityMode`   |    ✗     |     ✓      | DEPRECATED: Please use `resolution` field instead. For backward compatibility: _ `quick` maps to 720p resolution _ `studio` maps to 1080p resolution This field will be removed in a future version. Use the `resolution` field to directly to specify the resolution.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `"quick"`                                     |
| `width`            |    ✗     |     ✓      | `width` is deprecated and no longer influences the output video's resolution. This field is retained only for backward compatibility and will be removed in a future release.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `123`                                         |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageToVideo.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  audio: true,
  endSeconds: 5.0,
  model: "kling-2.5-audio",
  name: "My Image To Video video",
  resolution: "720p",
});
```

#### Response

##### Type

[V1ImageToVideoCreateResponse](/src/types/v1-image-to-video-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
