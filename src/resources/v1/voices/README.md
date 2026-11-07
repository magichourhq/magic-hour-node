# v1.voices

## Module Functions

### List voices <a name="list"></a>

List the voices available for text-to-speech. Use a voice's `id` as `style.voice_name` in the AI Voice Generator API. To fetch the next page, pass the response's next_cursor as cursor.

**API Endpoint**: `GET /v1/voices`

#### Parameters

| Parameter | Required | Description                                                        | Example    |
| --------- | :------: | ------------------------------------------------------------------ | ---------- |
| `cursor`  |    ✗     | Opaque pagination cursor from the previous response's next_cursor. | `"string"` |
| `limit`   |    ✗     | Maximum number of voices to return. Defaults to 20.                | `20`       |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.voices.list();
```

#### Response

##### Type

[V1VoicesListResponse](/src/types/v1-voices-list-response.ts)

##### Example

```typescript
{"nextCursor": "string", "voices": [{"avatarUrl": "https://d28dkohlqf5vwj.cloudfront.net/models/nano-banana/female-portrait-turtleneck.webp", "id": "cv-0001", "name": "Ashley", "previewUrl": "https://videos.magichour.ai/presets/voices/v2/cv-0001-ashley.mp3"}]}
```
