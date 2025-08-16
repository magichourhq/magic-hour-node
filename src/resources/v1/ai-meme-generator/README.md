
### AI Meme Generator <a name="create"></a>

Create an AI generated meme. Each meme costs 10 credits.

**API Endpoint**: `POST /v1/ai-meme-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `style` | ✓ |  | `{"searchWeb": false, "template": "Drake Hotline Bling", "topic": "When the code finally works"}` |
| `name` | ✗ | The name of the meme. | `"My Funny Meme"` |

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

#### Response

##### Type
[V1AiMemeGeneratorCreateResponse](/src/types/v1-ai-meme-generator-create-response.ts)

##### Example
`{"creditsCharged": 10, "frameCost": 10, "id": "cuid-example"}`
