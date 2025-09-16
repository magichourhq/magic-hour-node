# v1.ai-voice-generator

## Module Functions

### AI Voice Generator <a name="create"></a>

Generate speech from text. Each character costs 0.05 credits. The cost is rounded up to the nearest whole number.

**API Endpoint**: `POST /v1/ai-voice-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `style` | ✓ | The content used to generate speech. | `{"prompt": "Hello, how are you?", "voiceName": "Elon Musk"}` |
| `└─ prompt` | ✓ | Text used to generate speech. Starter tier users can use up to 200 characters, while Creator, Pro, or Business users can use up to 1000. | `"Hello, how are you?"` |
| `└─ voiceName` | ✓ | The voice to use for the speech. Available voices: Elon Musk, Mark Zuckerberg, Joe Rogan, Barack Obama, Morgan Freeman, Kanye West, Donald Trump, Joe Biden, Kim Kardashian, Taylor Swift | `"Elon Musk"` |
| `name` | ✗ | The name of audio. This value is mainly used for your own identification of the audio. | `"Voice Generator audio"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiVoiceGenerator.create({
  name: "Voice Generator audio",
  style: { prompt: "Hello, how are you?", voiceName: "Elon Musk" },
});

```

#### Response

##### Type
[V1AiVoiceGeneratorCreateResponse](/src/types/v1-ai-voice-generator-create-response.ts)

##### Example
`{"creditsCharged": 1, "id": "cuid-example"}`


