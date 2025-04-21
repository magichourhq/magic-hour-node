
### create <a name="create"></a>
Photo Colorizer

Colorize image. Each image costs 5 frames.

**API Endpoint**: `POST /v1/photo-colorizer`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.photoColorizer.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Photo Colorizer image",
});
```
