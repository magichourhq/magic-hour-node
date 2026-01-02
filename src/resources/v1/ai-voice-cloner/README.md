# v1.ai-voice-cloner

## Module Functions

### AI Voice Cloner <a name="create"></a>

Clone a voice from an audio sample and generate speech.

- Each character costs 0.05 credits.
- The cost is rounded up to the nearest whole number

**API Endpoint**: `POST /v1/ai-voice-cloner`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                                           | Example                                         |
| ------------------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for voice cloning.                                                                                                                                                                                                                                                                                                                                                 | `{"audioFilePath": "api-assets/id/1234.mp3"}`   |
| `└─ audioFilePath` |    ✓     | The audio used to clone the voice. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more. | `"api-assets/id/1234.mp3"`                      |
| `style`            |    ✓     |                                                                                                                                                                                                                                                                                                                                                                                       | `{"prompt": "Hello, this is my cloned voice."}` |
| `└─ prompt`        |    ✓     | Text used to generate speech from the cloned voice. The character limit is 1000 characters.                                                                                                                                                                                                                                                                                           | `"Hello, this is my cloned voice."`             |
| `name`             |    ✗     | The name of audio. This value is mainly used for your own identification of the audio.                                                                                                                                                                                                                                                                                                | `"Voice Cloner audio"`                          |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiVoiceCloner.create({
  assets: { audioFilePath: "api-assets/id/1234.mp3" },
  name: "Voice Cloner audio",
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
