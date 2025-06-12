
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

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for headshot photo | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `name` | ✗ | The name of image | `"Ai Headshot image"` |
| `style` | ✗ |  | `{"prompt": "professional passport photo, business attire, smiling, good posture, light blue background, centered, plain background"}` |
