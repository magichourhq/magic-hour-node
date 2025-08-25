# v1-aiclotheschanger

## Module Functions

<!-- CUSTOM DOCS START -->

<!-- CUSTOM DOCS END -->

### AI Clothes Changer <a name="create"></a>

Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.

**API Endpoint**: `POST /v1/ai-clothes-changer`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for clothes changer | `{"garmentFilePath": "api-assets/id/outfit.png", "garmentType": "upper_body", "personFilePath": "api-assets/id/model.png"}` |
| `└─ garmentFilePath` | ✓ | The image of the outfit. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/outfit.png"` |
| `└─ garmentType` | ✓ | The type of the outfit. | `"upper_body"` |
| `└─ personFilePath` | ✓ | The image with the person. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/model.png"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Clothes Changer image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiClothesChanger.create({
  assets: {
    garmentFilePath: "api-assets/id/outfit.png",
    garmentType: "upper_body",
    personFilePath: "api-assets/id/model.png",
  },
  name: "Clothes Changer image",
});

```

#### Response

##### Type
[V1AiClothesChangerCreateResponse](/src/types/v1-ai-clothes-changer-create-response.ts)

##### Example
`{"creditsCharged": 25, "frameCost": 25, "id": "cuid-example"}`

