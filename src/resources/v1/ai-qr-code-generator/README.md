
### create <a name="create"></a>
Create AI QR Code

Create an AI QR code. Each QR code costs 20 frames.

**API Endpoint**: `POST /v1/ai-qr-code-generator`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiQrCodeGenerator.create({
  data: {
    content: "https://magichour.ai",
    name: "Qr Code image",
    style: { art_style: "Watercolor" },
  },
});
```

**Upgrade to see all examples**
