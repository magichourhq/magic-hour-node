# v1.image-projects

## Module Functions




<!-- CUSTOM DOCS START -->

### Check results <a name="check-result"></a>

Poll the details API to check on the status of the rendering. Optionally can also download the output

#### Parameters

| Parameter            | Required | Description                                                                                          | Example          |
| -------------------- | :------: | ---------------------------------------------------------------------------------------------------- | ---------------- |
| `id`                 |    ✓     | Unique ID of the image project. This value is returned by all of the POST APIs that create an image. | `"cuid-example"` |
| `waitForCompletion`  |    ✗     | Whether to wait for the project to complete.                                                         | `True`           |
| `downloadOutputs`    |    ✗     | Whether to download the generated files                                                              | `True`           |
| `downloadDirectory`  |    ✗     | Directory to save downloaded files (defaults to current directory)                                   | `"./outputs"`    |

#### Synchronous Client

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const result = await client.v1.imageProjects.checkResult(
    { id: "cuid-example" },
    {
        waitForCompletion: true,
        downloadOutputs: true,
        downloadDirectory: "outputs",
    },
);
```

<!-- CUSTOM DOCS END -->
### Delete image <a name="delete"></a>

Permanently delete the rendered image(s). This action is not reversible, please be sure before deleting.

**API Endpoint**: `DELETE /v1/image-projects/{id}`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `id` | ✓ | Unique ID of the image project. This value is returned by all of the POST APIs that create an image. | `"cuid-example"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageProjects.delete({ id: "cuid-example" });

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
| `id` | ✓ | Unique ID of the image project. This value is returned by all of the POST APIs that create an image. | `"cuid-example"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.imageProjects.get({ id: "cuid-example" });

```

#### Response

##### Type
[V1ImageProjectsGetResponse](/src/types/v1-image-projects-get-response.ts)

##### Example
`{"createdAt": "1970-01-01T00:00:00", "creditsCharged": 5, "downloads": [{"expiresAt": "2024-10-19T05:16:19.027Z", "url": "https://videos.magichour.ai/id/output.png"}], "enabled": true, "error": {"code": "no_source_face", "message": "Please use an image with a detectable face"}, "id": "cuid-example", "imageCount": 1, "name": "Example Name", "status": "complete", "totalFrameCost": 5, "type": "AI_IMAGE"}`

