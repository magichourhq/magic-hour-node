# v1-autosubtitlegenerator

## Module Functions
### Auto Subtitle Generator <a name="create"></a>

Automatically generate subtitles for your video in multiple languages.

**API Endpoint**: `POST /v1/auto-subtitle-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for auto subtitle generator | `{"videoFilePath": "api-assets/id/1234.mp4"}` |
| `└─ videoFilePath` | ✓ | This is the video used to add subtitles. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.mp4"` |
| `endSeconds` | ✓ | The end time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0.1, and more than the start_seconds. | `15.0` |
| `startSeconds` | ✓ | The start time of the input video in seconds. This value is used to trim the input video. The value must be greater than 0. | `0.0` |
| `style` | ✓ | Style of the subtitle. At least one of `.style.template` or `.style.custom_config` must be provided.  * If only `.style.template` is provided, default values for the template will be used. * If both are provided, the fields in `.style.custom_config` will be used to overwrite the fields in `.style.template`. * If only `.style.custom_config` is provided, then all fields in `.style.custom_config` will be used.  To use custom config only, the following `custom_config` params are required: * `.style.custom_config.font` * `.style.custom_config.text_color` * `.style.custom_config.vertical_position` * `.style.custom_config.horizontal_position`  | `{}` |
| `└─ customConfig` | ✗ | Custom subtitle configuration. | `{"font": "Noto Sans", "fontSize": 24.0, "fontStyle": "normal", "highlightedTextColor": "#FFD700", "horizontalPosition": "center", "strokeColor": "#000000", "strokeWidth": 1.0, "textColor": "#FFFFFF", "verticalPosition": "bottom"}` |
| `└─ template` | ✗ | Preset subtitle templates. Please visit https://magichour.ai/create/auto-subtitle-generator to see the style of the existing templates. | `"cinematic"` |
| `name` | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Auto Subtitle video"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.autoSubtitleGenerator.create({
  assets: { videoFilePath: "api-assets/id/1234.mp4" },
  endSeconds: 15.0,
  name: "Auto Subtitle video",
  startSeconds: 0.0,
  style: {},
});

```

#### Response

##### Type
[V1AutoSubtitleGeneratorCreateResponse](/src/types/v1-auto-subtitle-generator-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

