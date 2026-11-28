# v1.estimate.audio

## Module Functions

### Estimate audio credits <a name="list"></a>

Get the credits an audio create request charges. Pass `tool`, then the field below that the tool's create request uses. Does not create a project or spend credits. It prices the fields passed here. It does not check your plan, your balance or the rest of the create request.

**API Endpoint**: `GET /v1/estimate/audio`

#### Parameters

| Parameter        | Required | Description                                                                                                            | Example                |
| ---------------- | :------: | ---------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `tool`           |    ✓     | The create endpoint to price, named by its path. For example `ai-voice-generator` for `POST /v1/ai-voice-generator`.   | `"ai-voice-generator"` |
| `characterCount` |    ✗     | The number of characters in the `style.prompt` of the create request. Used by `ai-voice-generator`, `ai-voice-cloner`. | `120`                  |
| `duration`       |    ✗     | The `duration` of the create request. Used by `ai-music-generator`.                                                    | `123`                  |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.estimate.audio.list({ tool: "ai-voice-generator" });
```

#### Response

##### Type

[V1EstimateAudioListResponse](/src/types/v1-estimate-audio-list-response.ts)

##### Example

```typescript
{"estimatedCredits": 150}
```
