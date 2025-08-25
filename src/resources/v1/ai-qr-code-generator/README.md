# v1-aiqrcodegenerator

## Module Functions

<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

### AI QR Code <a name="create"></a>

Create an AI QR code. Each QR code costs 20 credits.

**API Endpoint**: `POST /v1/ai-qr-code-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `content` | ✓ | The content of the QR code. | `"https://magichour.ai"` |
| `style` | ✓ |  | `{"artStyle": "Watercolor"}` |
| `└─ artStyle` | ✓ | To use our templates, pass in one of Watercolor, Cyberpunk City, Ink Landscape, Interior Painting, Japanese Street, Mech, Minecraft, Picasso Painting, Game Map, Spaceship, Chinese Painting, Winter Village, or pass any custom art style. | `"Watercolor"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Qr Code image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiQrCodeGenerator.create({
  content: "https://magichour.ai",
  name: "Qr Code image",
  style: { artStyle: "Watercolor" },
});

```

#### Response

##### Type
[V1AiQrCodeGeneratorCreateResponse](/src/types/v1-ai-qr-code-generator-create-response.ts)

##### Example
`{"creditsCharged": 20, "frameCost": 20, "id": "cuid-example"}`

