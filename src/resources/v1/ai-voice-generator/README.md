# v1.ai-voice-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Voice Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiVoiceGenerator.generate(
  {
    name: "Voice Generator audio",
    style: { prompt: "Hello, how are you?", voiceName: "Elon Musk" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Voice Generator <a name="create"></a>

Generate speech from text. Each character costs 0.1 credits. The cost is rounded up to the nearest whole number.

**API Endpoint**: `POST /v1/ai-voice-generator`

#### Parameters

| Parameter      | Required | Description                                                                                                               | Example                                                                                             |
| -------------- | :------: | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `style`        |    ✓     | The content used to generate speech.                                                                                      | `{"language": "spanish", "prompt": "Hello, how are you?", "speed": 1.15, "voiceName": "Elon Musk"}` |
| `└─ language`  |    ✗     | Spoken language. Use a canonical lowercase language name, or auto to detect the language from the text. Defaults to auto. | `"spanish"`                                                                                         |
| `└─ prompt`    |    ✓     | Text used to generate speech. The character limit is 5000 characters.                                                     | `"Hello, how are you?"`                                                                             |
| `└─ speed`     |    ✗     | Speech speed multiplier, from 0.75 to 1.30 inclusive. Defaults to 1 (normal speed).                                       | `1.15`                                                                                              |
| `└─ voiceName` |    ✓     | The voice to use for the speech. Use the `id` of a voice returned by `GET /v1/voices`.                                    | `"Elon Musk"`                                                                                       |
| `name`         |    ✗     | Give your audio a custom name for easy identification.                                                                    | `"My Voice Generator audio"`                                                                        |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiVoiceGenerator.create({
  name: "My Voice Generator audio",
  style: {
    language: "spanish",
    prompt: "Hello, how are you?",
    speed: 1.15,
    voiceName: "Elon Musk",
  },
});
```

#### Response

##### Type

[V1AiVoiceGeneratorCreateResponse](/src/types/v1-ai-voice-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 1, "id": "cuid-example"}
```
