# v1.audio-projects

## Module Functions

### Delete audio <a name="delete"></a>

Permanently delete the rendered audio file(s). This action is not reversible, please be sure before deleting.

**API Endpoint**: `DELETE /v1/audio-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | Unique ID of the audio project. This value is returned by all of the POST APIs that create an audio. | `"cuid-example"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.audioProjects.delete({ id: "cuid-example" });

```

### Get audio details <a name="get"></a>

Get the details of a audio project. The `downloads` field will be empty unless the audio was successfully rendered.

The audio can be one of the following status
- `draft` - not currently used
- `queued` - the job is queued and waiting for a GPU
- `rendering` - the generation is in progress
- `complete` - the audio is successful created
- `error` - an error occurred during rendering
- `canceled` - audio render is canceled by the user


**API Endpoint**: `GET /v1/audio-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | Unique ID of the audio project. This value is returned by all of the POST APIs that create an audio. | `"cuid-example"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.audioProjects.get({ id: "cuid-example" });

```

#### Response

##### Type
[V1AudioProjectsGetResponse](/src/types/v1-audio-projects-get-response.ts)

##### Example
`{"createdAt": "1970-01-01T00:00:00", "creditsCharged": 2, "downloads": [{"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.wav"}], "enabled": true, "error": {"code": "no_source_face", "message": "Please use an image with a detectable face"}, "id": "cuid-example", "name": "Example Name", "status": "complete", "type": "VOICE_GENERATOR"}`


