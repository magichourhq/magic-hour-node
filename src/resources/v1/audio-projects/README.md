# v1.audio-projects

## Module Functions

<!-- CUSTOM DOCS START -->

### Check results <a name="check-result"></a>

Poll the details API to check on the status of the rendering. Optionally can also download the output

#### Parameters

| Parameter           | Required | Description                                                                                          | Example          |
| ------------------- | :------: | ---------------------------------------------------------------------------------------------------- | ---------------- |
| `id`                |    ✓     | Unique ID of the audio project. This value is returned by all of the POST APIs that create an audio. | `"cuid-example"` |
| `waitForCompletion` |    ✗     | Whether to wait for the project to complete.                                                         | `True`           |
| `downloadOutputs`   |    ✗     | Whether to download the generated files                                                              | `True`           |
| `downloadDirectory` |    ✗     | Directory to save downloaded files (defaults to current directory)                                   | `"./outputs"`    |

#### Synchronous Client

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const result = await client.v1.audioProjects.checkResult(
  { id: "cuid-example" },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### Delete audio <a name="delete"></a>

Permanently delete the rendered audio file(s). This action is not reversible, please be sure before deleting.

**API Endpoint**: `DELETE /v1/audio-projects/{id}`

#### Parameters

| Parameter | Required | Description                                                                                          | Example          |
| --------- | :------: | ---------------------------------------------------------------------------------------------------- | ---------------- |
| `id`      |    ✓     | Unique ID of the audio project. This value is returned by all of the POST APIs that create an audio. | `"cuid-example"` |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.audioProjects.delete({ id: "cuid-example" });
```

### Get audio details <a name="get"></a>

Check the progress of a audio project. The `downloads` field is populated after a successful render.

**Statuses**

- `queued` — waiting to start
- `rendering` — in progress
- `complete` — ready; see `downloads`
- `error` — a failure occurred (see `error`)
- `canceled` — user canceled
- `draft` — not used

**API Endpoint**: `GET /v1/audio-projects/{id}`

#### Parameters

| Parameter | Required | Description                                                                                          | Example          |
| --------- | :------: | ---------------------------------------------------------------------------------------------------- | ---------------- |
| `id`      |    ✓     | Unique ID of the audio project. This value is returned by all of the POST APIs that create an audio. | `"cuid-example"` |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.audioProjects.get({ id: "cuid-example" });
```

#### Response

##### Type

[V1AudioProjectsGetResponse](/src/types/v1-audio-projects-get-response.ts)

##### Example

```typescript
{"createdAt": "1970-01-01T00:00:00", "creditsCharged": 2, "downloads": [{"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.wav"}], "enabled": true, "error": {"code": "no_source_face", "message": "Please use an image with a detectable face"}, "id": "cuid-example", "name": "Example Name", "status": "complete", "type": "VOICE_GENERATOR"}
```
