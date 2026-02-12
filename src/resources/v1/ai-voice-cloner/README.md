# v1.ai-voice-cloner

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Voice Cloner Workflow <a name="generate"></a>

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
const res = await client.v1.aiVoiceCloner.generate(
  {
    assets: { audioFilePath: "/path/to/audio.mp3" },
    name: "Voice Cloner audio",
    style: { prompt: "Hello, this is my cloned voice." },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Voice Cloner <a name="create"></a>

Clone a voice from an audio sample and generate speech.

- Each character costs 0.05 credits.
- The cost is rounded up to the nearest whole number

**API Endpoint**: `POST /v1/ai-voice-cloner`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                      | Example                                         |
| ------------------ | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for voice cloning.                                                                                                                                                                                                                                                                                                                            | `{"audioFilePath": "api-assets/id/1234.mp3"}`   |
| `└─ audioFilePath` |    ✓     | The audio used to clone the voice. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.mp3"`                      |
| `style`            |    ✓     |                                                                                                                                                                                                                                                                                                                                                                  | `{"prompt": "Hello, this is my cloned voice."}` |
| `└─ prompt`        |    ✓     | Text used to generate speech from the cloned voice. The character limit is 1000 characters.                                                                                                                                                                                                                                                                      | `"Hello, this is my cloned voice."`             |
| `name`             |    ✗     | Give your audio a custom name for easy identification.                                                                                                                                                                                                                                                                                                           | `"My Voice Cloner audio"`                       |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiVoiceCloner.create({
  assets: { audioFilePath: "api-assets/id/1234.mp3" },
  name: "My Voice Cloner audio",
  style: { prompt: "Hello, this is my cloned voice." },
});
```

#### Response

##### Type

[V1AiVoiceClonerCreateResponse](/src/types/v1-ai-voice-cloner-create-response.ts)

##### Example

```typescript
{"creditsCharged": 1, "id": "cuid-example"}
```
