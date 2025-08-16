
### AI Face Editor <a name="create"></a>

Edit facial features of an image using AI. Each edit costs 1 frame. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details

**API Endpoint**: `POST /v1/ai-face-editor`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for face editor | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `style` | ✓ | Face editing parameters | `{"enhanceFace": false, "eyeGazeHorizontal": 0.0, "eyeGazeVertical": 0.0, "eyeOpenRatio": 0.0, "eyebrowDirection": 0.0, "headPitch": 0.0, "headRoll": 0.0, "headYaw": 0.0, "lipOpenRatio": 0.0, "mouthGrim": 0.0, "mouthPositionHorizontal": 0.0, "mouthPositionVertical": 0.0, "mouthPout": 0.0, "mouthPurse": 0.0, "mouthSmile": 0.0}` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Face Editor image"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiFaceEditor.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Face Editor image",
  style: {
    enhanceFace: false,
    eyeGazeHorizontal: 0.0,
    eyeGazeVertical: 0.0,
    eyeOpenRatio: 0.0,
    eyebrowDirection: 0.0,
    headPitch: 0.0,
    headRoll: 0.0,
    headYaw: 0.0,
    lipOpenRatio: 0.0,
    mouthGrim: 0.0,
    mouthPositionHorizontal: 0.0,
    mouthPositionVertical: 0.0,
    mouthPout: 0.0,
    mouthPurse: 0.0,
    mouthSmile: 0.0,
  },
});

```

#### Response

##### Type
[V1AiFaceEditorCreateResponse](/src/types/v1-ai-face-editor-create-response.ts)

##### Example
`{"creditsCharged": 1, "frameCost": 1, "id": "cuid-example"}`
