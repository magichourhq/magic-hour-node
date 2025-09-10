# v1.face-swap-photo

## Module Functions
### Face Swap Photo <a name="create"></a>

Create a face swap photo. Each photo costs 5 credits. The height/width of the output image depends on your subscription. Please refer to our [pricing](https://magichour.ai/pricing) page for more details

**API Endpoint**: `POST /v1/face-swap-photo`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for face swap photo | `{"faceMappings": [{"newFace": "api-assets/id/1234.png", "originalFace": "api-assets/id/0-0.png"}], "faceSwapMode": "all-faces", "sourceFilePath": "api-assets/id/1234.png", "targetFilePath": "api-assets/id/1234.png"}` |
| `└─ faceMappings` | ✗ | This is the array of face mappings used for multiple face swap. The value is required if `face_swap_mode` is `individual-faces`. | `[{"newFace": "api-assets/id/1234.png", "originalFace": "api-assets/id/0-0.png"}]` |
| `└─ faceSwapMode` | ✗ | The mode of face swap. * `all-faces` - Swap all faces in the target image or video. `source_file_path` is required. * `individual-faces` - Swap individual faces in the target image or video. `source_faces` is required. | `"all-faces"` |
| `└─ sourceFilePath` | ✗ | This is the image from which the face is extracted. The value is required if `face_swap_mode` is `all-faces`.  This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `└─ targetFilePath` | ✓ | This is the image where the face from the source image will be placed. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Face Swap image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceSwapPhoto.create({
  assets: {
    faceMappings: [
      {
        newFace: "api-assets/id/1234.png",
        originalFace: "api-assets/id/0-0.png",
      },
    ],
    faceSwapMode: "all-faces",
    sourceFilePath: "api-assets/id/1234.png",
    targetFilePath: "api-assets/id/1234.png",
  },
  name: "Face Swap image",
});

```

#### Response

##### Type
[V1FaceSwapPhotoCreateResponse](/src/types/v1-face-swap-photo-create-response.ts)

##### Example
`{"creditsCharged": 5, "frameCost": 5, "id": "cuid-example"}`
<!-- CUSTOM DOCS START -->
### Face Swap Photo Generate Workflow <a name="generate"></a>

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
const res = await client.v1.faceSwapPhoto.generate(
  {
    assets: {
      faceMappings: [
        {
          newFace: "api-assets/id/1234.png",
          originalFace: "api-assets/id/0-0.png",
        },
      ],
      faceSwapMode: "all-faces",
      sourceFilePath: "/path/to/1234.png",
      targetFilePath: "/path/to/1234.png",
    },
    name: "Face Swap image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

```

<!-- CUSTOM DOCS END -->

