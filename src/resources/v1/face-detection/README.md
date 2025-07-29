
### Get face detection details <a name="get"></a>

Get the details of a face detection task.

**API Endpoint**: `GET /v1/face-detection/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | The id of the task | `"string"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceDetection.get({ id: "string" });

```

#### Response

##### Type
[V1FaceDetectionGetResponse](/src/types/v1-face-detection-get-response.ts)

##### Example
`{"creditsCharged": 123, "faces": [{"path": "api-assets/id/0-0.png", "url": "https://videos.magichour.ai/api-assets/id/0-0.png"}], "id": "string", "status": "complete"}`

### Face Detection <a name="create"></a>

Detect faces in an image or video. 

Note: Face detection is free to use for the near future. Pricing may change in the future.

**API Endpoint**: `POST /v1/face-detection`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for face detection | `{"targetFilePath": "api-assets/id/1234.png"}` |
| `confidence_score` | ✗ | Confidence threshold for filtering detected faces.  * Higher values (e.g., 0.9) include only faces detected with high certainty, reducing false positives.  * Lower values (e.g., 0.3) include more faces, but may increase the chance of incorrect detections. | `0.5` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceDetection.create({
  assets: { targetFilePath: "api-assets/id/1234.png" },
  confidenceScore: 0.5,
});

```

#### Response

##### Type
[V1FaceDetectionCreateResponse](/src/types/v1-face-detection-create-response.ts)

##### Example
`{"creditsCharged": 123, "id": "string"}`
