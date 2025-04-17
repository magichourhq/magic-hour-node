
### create <a name="create"></a>
AI Meme Generator

Create an AI generated meme. Each meme costs 10 frames.

**API Endpoint**: `POST /v1/ai-meme-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiMemeGenerator.create({
  name: "My Funny Meme",
  style: {
    searchWeb: false,
    template: "Drake Hotline Bling",
    topic: "When the code finally works",
  },
});
```
