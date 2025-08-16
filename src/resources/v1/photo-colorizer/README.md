
### Photo Colorizer <a name="create"></a>

Colorize image. Each image costs 5 credits.

**API Endpoint**: `POST /v1/photo-colorizer`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for photo colorization | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Photo Colorizer image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.photoColorizer.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Photo Colorizer image",
});

```

#### Response

##### Type
[V1PhotoColorizerCreateResponse](/src/types/v1-photo-colorizer-create-response.ts)

##### Example
`{"creditsCharged": 5, "frameCost": 5, "id": "cuid-example"}`
