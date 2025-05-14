
### AI Headshots <a name="create"></a>

Create an AI headshot. Each headshot costs 50 credits.

**API Endpoint**: `POST /v1/ai-headshot-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiHeadshotGenerator.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Ai Headshot image",
});
```
