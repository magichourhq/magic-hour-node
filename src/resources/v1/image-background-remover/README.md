
### Image Background Remover <a name="create"></a>

Remove background from image. Each image costs 5 credits.

**API Endpoint**: `POST /v1/image-background-remover`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for background removal | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `name` | ✗ | The name of image | `"Background Remover image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageBackgroundRemover.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Background Remover image",
});

```

#### Response

##### Type
[V1ImageBackgroundRemoverCreateResponse](/src/types/v1-image-background-remover-create-response.ts)

##### Example
`{"creditsCharged": 5, "frameCost": 5, "id": "clx7uu86w0a5qp55yxz315r6r"}`
