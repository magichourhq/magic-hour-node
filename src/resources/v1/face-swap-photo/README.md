
### Face Swap Photo <a name="create"></a>

Create a face swap photo. Each photo costs 5 credits. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details

**API Endpoint**: `POST /v1/face-swap-photo`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for face swap photo | `{"faceMappings": [{"newFace": "api-assets/id/1234.png", "originalFace": "api-assets/id/0-0.png"}], "faceSwapMode": "all-faces", "sourceFilePath": "api-assets/id/1234.png", "targetFilePath": "api-assets/id/1234.png"}` |
| `name` | ✗ | The name of image | `"Face Swap image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceSwapPhoto.create({
  assets: {
    faceMappings: [
      {
        newFace: "api-assets/id/1234.png",
        originalFace: "api-assets/id/0-0.png",
      },
    ],
    faceSwapMode: "all-faces",
    sourceFilePath: "api-assets/id/1234.png",
    targetFilePath: "api-assets/id/1234.png",
  },
  name: "Face Swap image",
});

```

#### Response

##### Type
[V1FaceSwapPhotoCreateResponse](/src/types/v1-face-swap-photo-create-response.ts)

##### Example
`{"creditsCharged": 5, "frameCost": 5, "id": "clx7uu86w0a5qp55yxz315r6r"}`
