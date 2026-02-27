# v1.ai-talking-photo

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Talking Photo Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiTalkingPhoto.generate(
  {
    assets: {
      audioFilePath: "/path/to/1234.mp3",
      imageFilePath: "/path/to/1234.png",
    },
    endSeconds: 15.0,
    name: "Talking Photo image",
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

### AI Talking Photo <a name="create"></a>

Create a talking photo from an image and audio or text input.

**API Endpoint**: `POST /v1/ai-talking-photo`

#### Parameters

| Parameter           | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                    | Example                                                                                  |
| ------------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `assets`            |    ✓     | Provide the assets for creating a talking photo                                                                                                                                                                                                                                                                                                                                                                | `{"audioFilePath": "api-assets/id/1234.mp3", "imageFilePath": "api-assets/id/1234.png"}` |
| `└─ audioFilePath`  |    ✓     | The audio file to sync with the image. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                           | `"api-assets/id/1234.mp3"`                                                               |
| `└─ imageFilePath`  |    ✓     | The source image to animate. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                     | `"api-assets/id/1234.png"`                                                               |
| `endSeconds`        |    ✓     | The end time of the input audio in seconds. The maximum duration allowed is 60 seconds.                                                                                                                                                                                                                                                                                                                        | `15.0`                                                                                   |
| `startSeconds`      |    ✓     | The start time of the input audio in seconds. The maximum duration allowed is 60 seconds.                                                                                                                                                                                                                                                                                                                      | `0.0`                                                                                    |
| `maxResolution`     |    ✗     | Constrains the larger dimension (height or width) of the output video. Allows you to set a lower resolution than your plan's maximum if desired. The value is capped by your plan's max resolution.                                                                                                                                                                                                            | `1024`                                                                                   |
| `name`              |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                         | `"My Talking Photo image"`                                                               |
| `style`             |    ✗     | Attributes used to dictate the style of the output                                                                                                                                                                                                                                                                                                                                                             | `{"generationMode": "realistic"}`                                                        |
| `└─ generationMode` |    ✗     | Controls overall motion style. * `realistic` - Maintains likeness well, high quality, and reliable. * `prompted` - Slightly lower likeness; allows option to prompt scene. **Deprecated values (maintained for backward compatibility):** * `pro` - Deprecated: use `realistic` * `standard` - Deprecated: use `prompted` * `stable` - Deprecated: use `realistic` * `expressive` - Deprecated: use `prompted` | `"realistic"`                                                                            |
| `└─ intensity`      |    ✗     | Note: this value is only applicable when generation_mode is `expressive`. The value can include up to 2 decimal places. * Lower values yield more stability but can suppress mouth movement. * Higher values increase motion and expressiveness, with a higher risk of distortion.                                                                                                                             | `123.0`                                                                                  |
| `└─ prompt`         |    ✗     | A text prompt to guide the generation. Only applicable when generation_mode is `prompted`. This field is ignored for other modes.                                                                                                                                                                                                                                                                              | `"string"`                                                                               |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiTalkingPhoto.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    imageFilePath: "api-assets/id/1234.png",
  },
  endSeconds: 15.0,
  maxResolution: 1024,
  name: "My Talking Photo image",
  startSeconds: 0.0,
});
```

#### Response

##### Type

[V1AiTalkingPhotoCreateResponse](/src/types/v1-ai-talking-photo-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
