
### create <a name="create"></a>
AI Clothes Changer

Change outfits in photos in seconds with just a photo reference. Each photo costs 25 frames.

**API Endpoint**: `POST /v1/ai-clothes-changer`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiClothesChanger.create({
  assets: {
    garmentFilePath: "api-assets/id/outfit.png",
    garmentType: "dresses",
    personFilePath: "api-assets/id/model.png",
  },
  name: "Clothes Changer image",
});
```
