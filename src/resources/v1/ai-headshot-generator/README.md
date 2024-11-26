
### create <a name="create"></a>
Create AI Headshots

Create an AI headshot. Each headshot costs 50 frames.

**API Endpoint**: `POST /v1/ai-headshot-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiHeadshotGenerator.create({
  data: {
    assets: { image_file_path: "image/id/1234.png" },
    name: "Ai Headshot image",
  },
});
```

**Upgrade to see all examples**
