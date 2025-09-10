# v1.animation

## Module Functions
### Animation <a name="create"></a>

Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.

**API Endpoint**: `POST /v1/animation`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for animation. | `{"audioFilePath": "api-assets/id/1234.mp3", "audioSource": "file", "imageFilePath": "api-assets/id/1234.png"}` |
| `└─ audioFilePath` | ✗ | The path of the input audio. This field is required if `audio_source` is `file`. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.mp3"` |
| `└─ audioSource` | ✓ | Optionally add an audio source if you'd like to incorporate audio into your video | `"file"` |
| `└─ imageFilePath` | ✗ | An initial image to use a the first frame of the video. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `└─ youtubeUrl` | ✗ | Using a youtube video as the input source. This field is required if `audio_source` is `youtube` | `"http://www.example.com"` |
| `endSeconds` | ✓ | This value determines the duration of the output video. | `15.0` |
| `fps` | ✓ | The desire output video frame rate | `12.0` |
| `height` | ✓ | The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `960` |
| `style` | ✓ | Defines the style of the output video | `{"artStyle": "Painterly Illustration", "cameraEffect": "Simple Zoom In", "prompt": "Cyberpunk city", "promptType": "custom", "transitionSpeed": 5}` |
| `└─ artStyle` | ✓ | The art style used to create the output video | `"Painterly Illustration"` |
| `└─ artStyleCustom` | ✗ | Describe custom art style. This field is required if `art_style` is `Custom` | `"string"` |
| `└─ cameraEffect` | ✓ | The camera effect used to create the output video | `"Simple Zoom In"` |
| `└─ prompt` | ✗ | The prompt used for the video. Prompt is required if `prompt_type` is `custom`. Otherwise this value is ignored | `"Cyberpunk city"` |
| `└─ promptType` | ✓ |  * `custom` - Use your own prompt for the video. * `use_lyrics` - Use the lyrics of the audio to create the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`. * `ai_choose` - Let AI write the prompt. If this option is selected, then `assets.audio_source` must be `file` or `youtube`. | `"custom"` |
| `└─ transitionSpeed` | ✓ | Change determines how quickly the video's content changes across frames.  * Higher = more rapid transitions. * Lower = more stable visual experience. | `5` |
| `width` | ✓ | The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details | `512` |
| `name` | ✗ | The name of video. This value is mainly used for your own identification of the video. | `"Animation video"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.animation.create({
  assets: {
    audioFilePath: "api-assets/id/1234.mp3",
    audioSource: "file",
    imageFilePath: "api-assets/id/1234.png",
  },
  endSeconds: 15.0,
  fps: 12.0,
  height: 960,
  name: "Animation video",
  style: {
    artStyle: "Painterly Illustration",
    cameraEffect: "Simple Zoom In",
    prompt: "Cyberpunk city",
    promptType: "custom",
    transitionSpeed: 5,
  },
  width: 512,
});

```

#### Response

##### Type
[V1AnimationCreateResponse](/src/types/v1-animation-create-response.ts)

##### Example
`{"creditsCharged": 450, "estimatedFrameCost": 450, "id": "cuid-example"}`
<!-- CUSTOM DOCS START -->
### Animation Generate Workflow <a name="generate"></a>

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
const res = await client.v1.animation.generate(
  {
    assets: {
      audioFilePath: "/path/to/1234.mp3",
      audioSource: "file",
      imageFilePath: "/path/to/1234.png",
    },
    endSeconds: 15.0,
    fps: 12.0,
    height: 960,
    name: "Animation video",
    style: {
      artStyle: "Painterly Illustration",
      cameraEffect: "Simple Zoom In",
      prompt: "Cyberpunk city",
      promptType: "custom",
      transitionSpeed: 5,
    },
    width: 512,
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

```

<!-- CUSTOM DOCS END -->

