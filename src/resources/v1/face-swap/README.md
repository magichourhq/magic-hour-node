# v1-faceswap

## Module Functions
### Face Swap video <a name="create"></a>

Create a Face Swap video. The estimated frame cost is calculated using 30 FPS. This amount is deducted from your account balance when a video is queued. Once the video is complete, the cost will be updated based on the actual number of frames rendered.
  
Get more information about this mode at our [product page](https://magichour.ai/products/face-swap).
  

**API Endpoint**: `POST /v1/face-swap`

#### Parameters

| Parameter | Required | Deprecated | Description | Example |
|-----------|:--------:|:----------:|-------------|--------|
| `assets` | ✓ | ✗ | Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used | `{"faceMappings": [{"newFace": "api-assets/id/1234.png", "originalFace": "api-assets/id/0-0.png"}], "faceSwapMode": "all-faces", "imageFilePath": "image/id/1234.png", "videoFilePath": "api-assets/id/1234.mp4", "videoSource": "file"}` |
| `└─ faceMappings` | ✗ | — | This is the array of face mappings used for multiple face swap. The value is required if `face_swap_mode` is `individual-faces`. | `[{"newFace": "api-assets/id/1234.png", "originalFace": "api-assets/id/0-0.png"}]` |
| `└─ faceSwapMode` | ✗ | — | The mode of face swap. * `all-faces` - Swap all faces in the target image or video. `source_file_path` is required. * `individual-faces` - Swap individual faces in the target image or video. `source_faces` is required. | `"all-faces"` |
| `└─ imageFilePath` | ✗ | — | The path of the input image with the face to be swapped.  The value is required if `face_swap_mode` is `all-faces`.  This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"image/id/1234.png"` |
| `└─ videoFilePath` | ✗ | — | Required if `video_source` is `file`. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.mp4"` |
| `└─ videoSource` | ✓ | — |  | `"file"` |
| `└─ youtubeUrl` | ✗ | — | Using a youtube video as the input source. This field is required if `video_source` is `youtube` | `"http://www.example.com"` |
| `endSeconds` | ✓ | ✗ | The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds. | `15.0` |
| `startSeconds` | ✓ | ✗ | The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0. | `0.0` |
| `height` | ✗ | ✓ | `height` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |
| `name` | ✗ | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Face Swap video"` |
| `style` | ✗ | ✗ | Style of the face swap video. | `{"version": "default"}` |
| `└─ version` | ✗ | — | * `v1` - May preserve skin detail and texture better, but weaker identity preservation. * `v2` - Faster, sharper, better handling of hair and glasses. stronger identity preservation. (Recommended) * `default` - Use the version we recommend, which will change over time. This is recommended unless you need a specific earlier version. This is the default behavior. | `"default"` |
| `width` | ✗ | ✓ | `width` is deprecated and no longer influences the output video's resolution.  Output resolution is determined by the **minimum** of: - The resolution of the input video - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.  This field is retained only for backward compatibility and will be removed in a future release. | `123` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceSwap.create({
  assets: {
    faceMappings: [
      {
        newFace: "api-assets/id/1234.png",
        originalFace: "api-assets/id/0-0.png",
      },
    ],
    faceSwapMode: "all-faces",
    imageFilePath: "image/id/1234.png",
    videoFilePath: "api-assets/id/1234.mp4",
    videoSource: "file",
  },
  endSeconds: 15.0,
  name: "Face Swap video",
  startSeconds: 0.0,
  style: { version: "default" },
});

```

#### Response

##### Type
[V1FaceSwapCreateResponse](/src/types/v1-face-swap-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

