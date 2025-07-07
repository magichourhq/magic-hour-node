
### Delete image <a name="delete"></a>

Permanently delete the rendered image. This action is not reversible, please be sure before deleting.

**API Endpoint**: `DELETE /v1/image-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | The id of the image project | `"cm6pvghix03bvyz0zwash6noj"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageProjects.delete({
  id: "cm6pvghix03bvyz0zwash6noj",
});

```

### Get image details <a name="get"></a>

Get the details of a image project. The `downloads` field will be empty unless the image was successfully rendered.

The image can be one of the following status
- `draft` - not currently used
- `queued` - the job is queued and waiting for a GPU
- `rendering` - the generation is in progress
- `complete` - the image is successful created
- `error` - an error occurred during rendering
- `canceled` - image render is canceled by the user


**API Endpoint**: `GET /v1/image-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | The id of the image project | `"cm6pvghix03bvyz0zwash6noj"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageProjects.get({
  id: "cm6pvghix03bvyz0zwash6noj",
});

```

#### Response

##### Type
[V1ImageProjectsGetResponse](/src/types/v1-image-projects-get-response.ts)

##### Example
`{"createdAt": "1970-01-01T00:00:00", "creditsCharged": 5, "downloads": [{"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.png"}], "enabled": true, "error": {"code": "no_source_face", "message": "Please use an image with a detectable face"}, "id": "clx7uu86w0a5qp55yxz315r6r", "imageCount": 1, "name": "Example Name", "status": "complete", "totalFrameCost": 5, "type": "AI_IMAGE"}`
