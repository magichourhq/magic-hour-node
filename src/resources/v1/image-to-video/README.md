# v1.image-to-video

## Module Functions
### Image-to-Video <a name="create"></a>

Create a Image To Video video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](https://magichour.ai/products/image-to-video).
  

**API Endpoint**: `POST /v1/image-to-video`

#### Parameters

| Parameter | Required | Deprecated | Description | Example |
|-----------|:--------:|:----------:|-------------|--------|
| `assets` | ✓ | ✗ | Provide the assets for image-to-video. | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` | ✓ | — | The path of the image file. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `endSeconds` | ✓ | ✗ | The total duration of the output video in seconds. | `5.0` |
| `height` | ✗ | ✓ | `height` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |
| `name` | ✗ | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Image To Video video"` |
| `resolution` | ✗ | ✗ | Controls the output video resolution. Defaults to `720p` if not specified.  480p and 720p are available on Creator, Pro, or Business tiers. However, 1080p require Pro or Business tier.  **Options:** - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds. - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds. - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds. | `"720p"` |
| `style` | ✗ | ✗ | Attributed used to dictate the style of the output | `{"prompt": "a dog running"}` |
| `└─ highQuality` | ✗ | ✓ | Deprecated: Please use `resolution` instead. For backward compatibility,  * `false` maps to 720p resolution * `true` maps to 1080p resolution  This field will be removed in a future version. Use the `resolution` field to directly specify the resolution. | `true` |
| `└─ prompt` | ✗ | — | The prompt used for the video. | `"a dog running"` |
| `└─ qualityMode` | ✗ | ✓ | DEPRECATED: Please use `resolution` field instead. For backward compatibility: * `quick` maps to 720p resolution * `studio` maps to 1080p resolution  This field will be removed in a future version. Use the `resolution` field to directly to specify the resolution. | `"quick"` |
| `width` | ✗ | ✓ | `width` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageToVideo.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  endSeconds: 5.0,
  name: "Image To Video video",
  resolution: "720p",
});

```

#### Response

##### Type
[V1ImageToVideoCreateResponse](/src/types/v1-image-to-video-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
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
import Client from "magic-hour";

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
    downloadDirectory: "outputs",
  },
);

```

<!-- CUSTOM DOCS END -->

