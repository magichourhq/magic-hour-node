
### create <a name="create"></a>
Image Background Remover

Remove background from image. Each image costs 5 frames.

**API Endpoint**: `POST /v1/image-background-remover`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageBackgroundRemover.create({
  assets: { imageFilePath: "image/id/1234.png" },
});
```
