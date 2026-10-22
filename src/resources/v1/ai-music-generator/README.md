# v1.ai-music-generator

## generate

Creates the project, waits for completion, and downloads outputs by default.

```typescript
const result = await client.v1.aiMusicGenerator.generate({
  duration: 120,
  style: { prompt: "Dreamy synthwave with warm bass" },
});
```

Pass `{ waitForCompletion: false }` as the second argument to return the current project status, or `{ downloadOutputs: false }` to skip downloads. Use `downloadDirectory` to choose the output folder.

## Module Functions

### AI Music Generator <a name="create"></a>

Generate music from a description, with optional custom lyrics or instrumental-only output. Costs 1 credits per requested second. Returns a project ID; poll GET /v1/audio-projects/{id} for status and downloads.

**API Endpoint**: `POST /v1/ai-music-generator`

#### Parameters

| Parameter              | Required | Description                                                                            | Example                                                                                                                       |
| ---------------------- | :------: | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `duration`             |    ✓     | Requested track duration in seconds, from 15 to 300. Determines credits charged.       | `120`                                                                                                                         |
| `style`                |    ✓     |                                                                                        | `{"instrumental": false, "lyrics": "City lights are fading...", "prompt": "Dreamy synthwave with warm bass and soft vocals"}` |
| `└─ instrumental`      |    ✗     | Generate music without vocals. When true, lyrics is ignored.                           | `false`                                                                                                                       |
| `└─ lyrics`            |    ✗     | Custom lyrics. Omit or leave blank for AI-generated lyrics when instrumental is false. | `"City lights are fading..."`                                                                                                 |
| `└─ prompt`            |    ✓     | Describe the song, including genre, mood, and instruments.                             | `"Dreamy synthwave with warm bass and soft vocals"`                                                                           |
| `additionalProperties` |    ✗     |                                                                                        | `{}`                                                                                                                          |
| `name`                 |    ✗     | Give your audio a custom name for easy identification.                                 | `"My Music Generator audio"`                                                                                                  |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiMusicGenerator.create({
  duration: 120,
  name: "My Music Generator audio",
  style: {
    instrumental: false,
    lyrics: "City lights are fading...",
    prompt: "Dreamy synthwave with warm bass and soft vocals",
  },
});
```

#### Response

##### Type

[V1AiMusicGeneratorCreateResponse](/src/types/v1-ai-music-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 120, "id": "cuid-example"}
```
