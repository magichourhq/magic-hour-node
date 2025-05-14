
### AI GIFs <a name="create"></a>

Create an AI GIF. Each GIF costs 25 credits.

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
