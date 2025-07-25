
### AI Clothes Changer <a name="create"></a>

Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.

**API Endpoint**: `POST /v1/ai-clothes-changer`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for clothes changer | `{"garmentFilePath": "api-assets/id/outfit.png", "garmentType": "dresses", "personFilePath": "api-assets/id/model.png"}` |
| `name` | ✗ | The name of image | `"Clothes Changer image"` |

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

#### Response

##### Type
[V1AiClothesChangerCreateResponse](/src/types/v1-ai-clothes-changer-create-response.ts)

##### Example
`{"creditsCharged": 25, "frameCost": 25, "id": "clx7uu86w0a5qp55yxz315r6r"}`
