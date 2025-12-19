# v1.ai-qr-code-generator

## Module Functions





<!-- CUSTOM DOCS START -->
### AI Qr Code Generator Generate Workflow <a name="generate"></a>

The workflow performs the following action

1. upload local assets to Magic Hour storage. So you can pass in a local path instead of having to upload files yourself
2. trigger a generation
3. poll for a completion status. This is configurable
4. if success, download the output to local directory

> [!TIP]
> This is the recommended way to use the SDK unless you have specific needs where it is necessary to split up the actions.

#### Parameters

In addition to the parameters listed in the `create` section below, `generate` introduces 3 new parameters:

- `waitForCompletion` (boolean, default true): Whether to wait for the project to complete.
- `downloadOutputs` (boolean, default true): Whether to download the generated files
- `downloadDirectory` (string, optional): Directory to save downloaded files (defaults to current directory)

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiQrCodeGenerator.generate(
  {
    content: "https://magichour.ai",
    name: "Qr Code image",
    style: { artStyle: "Watercolor" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

```

<!-- CUSTOM DOCS END -->
### AI QR Code Generator <a name="create"></a>

Create an AI QR code. Each QR code costs 0 credits.

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
`{"creditsCharged": 0, "frameCost": 0, "id": "cuid-example"}`

