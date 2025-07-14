
### AI GIFs <a name="create"></a>

Create an AI GIF. Each GIF costs 50 credits.

**API Endpoint**: `POST /v1/ai-gif-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `style` | ✓ |  | `{"prompt": "Cute dancing cat, pixel art"}` |
| `name` | ✗ | The name of gif | `"Ai Gif gif"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiGifGenerator.create({
  name: "Ai Gif gif",
  style: { prompt: "Cute dancing cat, pixel art" },
});

```

#### Response

##### Type
[V1AiGifGeneratorCreateResponse](/src/types/v1-ai-gif-generator-create-response.ts)

##### Example
`{"creditsCharged": 50, "frameCost": 50, "id": "clx7uu86w0a5qp55yxz315r6r"}`
