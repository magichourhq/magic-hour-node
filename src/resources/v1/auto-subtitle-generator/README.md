# v1.auto-subtitle-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### Auto Subtitle Generator Generate Workflow <a name="generate"></a>

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
const res = await client.v1.autoSubtitleGenerator.generate(
  {
    assets: { videoFilePath: "/path/to/1234.mp4" },
    endSeconds: 15.0,
    name: "Auto Subtitle video",
    startSeconds: 0.0,
    style: {},
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### Auto Subtitle Generator <a name="create"></a>

Automatically generate subtitles for your video in multiple languages.

**API Endpoint**: `POST /v1/auto-subtitle-generator`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Example                                                                                                                                                                                                                                 |
| ------------------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for auto subtitle generator                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `{"videoFilePath": "api-assets/id/1234.mp4"}`                                                                                                                                                                                           |
| `└─ videoFilePath` |    ✓     | This is the video used to add subtitles. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.                                                                                                                                                                                                                                                                                             | `"api-assets/id/1234.mp4"`                                                                                                                                                                                                              |
| `endSeconds`       |    ✓     | End time of your clip (seconds). Must be greater than start_seconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `15.0`                                                                                                                                                                                                                                  |
| `startSeconds`     |    ✓     | Start time of your clip (seconds). Must be ≥ 0.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `0.0`                                                                                                                                                                                                                                   |
| `style`            |    ✓     | Style of the subtitle. At least one of `.style.template` or `.style.custom_config` must be provided. _ If only `.style.template` is provided, default values for the template will be used. _ If both are provided, the fields in `.style.custom_config` will be used to overwrite the fields in `.style.template`. _ If only `.style.custom_config` is provided, then all fields in `.style.custom_config` will be used. To use custom config only, the following `custom_config` params are required: _ `.style.custom_config.font` _ `.style.custom_config.text_color` _ `.style.custom_config.vertical_position` \* `.style.custom_config.horizontal_position` | `{}`                                                                                                                                                                                                                                    |
| `└─ customConfig`  |    ✗     | Custom subtitle configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `{"font": "Noto Sans", "fontSize": 24.0, "fontStyle": "normal", "highlightedTextColor": "#FFD700", "horizontalPosition": "center", "strokeColor": "#000000", "strokeWidth": 1.0, "textColor": "#FFFFFF", "verticalPosition": "bottom"}` |
| `└─ template`      |    ✗     | Preset subtitle templates. Please visit https://magichour.ai/create/auto-subtitle-generator to see the style of the existing templates.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"cinematic"`                                                                                                                                                                                                                           |
| `name`             |    ✗     | Give your video a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `"My Auto Subtitle video"`                                                                                                                                                                                                              |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.autoSubtitleGenerator.create({
  assets: { videoFilePath: "api-assets/id/1234.mp4" },
  endSeconds: 15.0,
  name: "My Auto Subtitle video",
  startSeconds: 0.0,
  style: {},
});
```

#### Response

##### Type

[V1AutoSubtitleGeneratorCreateResponse](/src/types/v1-auto-subtitle-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}
```
