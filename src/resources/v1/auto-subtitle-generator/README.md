
### Auto Subtitle Generator <a name="create"></a>

Automatically generate subtitles for your video in multiple languages.

**API Endpoint**: `POST /v1/auto-subtitle-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for auto subtitle generator | `{"videoFilePath": "api-assets/id/1234.mp4"}` |
| `end_seconds` | ✓ | The end time of the input video in seconds | `15.0` |
| `start_seconds` | ✓ | The start time of the input video in seconds | `0.0` |
| `style` | ✓ | Style of the subtitle. At least one of `.style.template` or `.style.custom_config` must be provided.  * If only `.style.template` is provided, default values for the template will be used. * If both are provided, the fields in `.style.custom_config` will be used to overwrite the fields in `.style.template`. * If only `.style.custom_config` is provided, then all fields in `.style.custom_config` will be used.  To use custom config only, the following `custom_config` params are required: * `.style.custom_config.font` * `.style.custom_config.text_color` * `.style.custom_config.vertical_position` * `.style.custom_config.horizontal_position`  | `{}` |
| `name` | ✗ | The name of video | `"Auto Subtitle video"` |

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
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "clx7uu86w0a5qp55yxz315r6r"}`
