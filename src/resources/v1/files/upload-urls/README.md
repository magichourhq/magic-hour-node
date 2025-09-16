# v1.files.upload-urls

## Module Functions

### Generate asset upload urls <a name="create"></a>

Generates a list of pre-signed upload URLs for the assets required. This API is only necessary if you want to upload to Magic Hour's storage. Refer to the [Input Files Guide](/integration/input-files) for more details.

The response array will match the order of items in the request body.

**Valid file extensions per asset type**:
- video: mp4, m4v, mov, webm
- audio: mp3, mpeg, wav, aac, aiff, flac
- image: png, jpg, jpeg, webp, avif, jp2, tiff, bmp

> Note: `gif` is only supported for face swap API `video_file_path` field.

Once you receive an upload URL, send a `PUT` request to upload the file directly.

Example:

```
curl -X PUT --data '@/path/to/file/video.mp4' \
  https://videos.magichour.ai/api-assets/id/video.mp4?<auth params from the API response>
```


**API Endpoint**: `POST /v1/files/upload-urls`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `items` | ✓ | The list of assets to upload. The response array will match the order of items in the request body. | `[{"extension": "mp4", "type": "video"}, {"extension": "mp3", "type": "audio"}]` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.files.uploadUrls.create({
  items: [
    { extension: "mp4", type: "video" },
    { extension: "mp3", type: "audio" },
  ],
});

```

#### Response

##### Type
[V1FilesUploadUrlsCreateResponse](/src/types/v1-files-upload-urls-create-response.ts)

##### Example
`{"items": [{"expiresAt": "2024-07-25T16:56:21.932Z", "filePath": "api-assets/id/video.mp4", "uploadUrl": "https://videos.magichour.ai/api-assets/id/video.mp4?auth-value=1234567890"}, {"expiresAt": "2024-07-25T16:56:21.932Z", "filePath": "api-assets/id/audio.mp3", "uploadUrl": "https://videos.magichour.ai/api-assets/id/audio.mp3?auth-value=1234567890"}]}`


