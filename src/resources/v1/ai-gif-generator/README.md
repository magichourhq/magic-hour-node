
### create <a name="create"></a>
AI GIFs

Create an AI GIF. Each GIF costs 5 frames.

**API Endpoint**: `POST /v1/ai-gif-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiGifGenerator.create({
  name: "Ai Gif gif",
  style: { prompt: "Cute dancing cat, pixel art" },
});
```
