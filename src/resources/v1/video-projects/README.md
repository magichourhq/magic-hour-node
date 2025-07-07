
### Delete video <a name="delete"></a>

Permanently delete the rendered video. This action is not reversible, please be sure before deleting.

**API Endpoint**: `DELETE /v1/video-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | The id of the video project | `"cm6pvghix03bvyz0zwash6noj"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.videoProjects.delete({
  id: "cm6pvghix03bvyz0zwash6noj",
});

```

### Get video details <a name="get"></a>

Get the details of a video project. The `downloads` field will be empty unless the video was successfully rendered.

The video can be one of the following status
- `draft` - not currently used
- `queued` - the job is queued and waiting for a GPU
- `rendering` - the generation is in progress
- `complete` - the video is successful created
- `error` - an error occurred during rendering
- `canceled` - video render is canceled by the user


**API Endpoint**: `GET /v1/video-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | The id of the video | `"cm6pvghix03bvyz0zwash6noj"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.videoProjects.get({
  id: "cm6pvghix03bvyz0zwash6noj",
});

```

#### Response

##### Type
[V1VideoProjectsGetResponse](/src/types/v1-video-projects-get-response.ts)

##### Example
`{"createdAt": "1970-01-01T00:00:00", "creditsCharged": 450, "download": {"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.mp4"}, "downloads": [{"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.mp4"}], "enabled": true, "endSeconds": 15.0, "error": {"code": "no_source_face", "message": "Please use an image with a detectable face"}, "fps": 30.0, "height": 960, "id": "clx7uu86w0a5qp55yxz315r6r", "name": "Example Name", "startSeconds": 0.0, "status": "complete", "totalFrameCost": 450, "type": "FACE_SWAP", "width": 512}`
