
### AI Headshots <a name="create"></a>

Create an AI headshot. Each headshot costs 50 credits.

**API Endpoint**: `POST /v1/ai-headshot-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for headshot photo | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Ai Headshot image"` |
| `style` | ✗ |  | `{}` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiHeadshotGenerator.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Ai Headshot image",
});

```

#### Response

##### Type
[V1AiHeadshotGeneratorCreateResponse](/src/types/v1-ai-headshot-generator-create-response.ts)

##### Example
`{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}`
