
### Generate asset upload urls <a name="create"></a>

Create a list of urls used to upload the assets needed to generate a video. Each video type has their own requirements on what assets are required. Please refer to the specific mode API for more details. The response array will be in the same order as the request body.

Below is the list of valid extensions for each asset type:

- video: mp4, m4v, mov, webm
- audio: mp3, mpeg, wav, aac, aiff, flac
- image: png, jpg, jpeg, webp, avif, jp2, tiff, bmp

Note: `.gif` is supported for face swap API `video_file_path` field.

After receiving the upload url, you can upload the file by sending a PUT request.

For example using curl

```
curl -X PUT --data '@/path/to/file/video.mp4' \
  https://videos.magichour.ai/api-assets/id/video.mp4?<auth params from the API response>
```


**API Endpoint**: `POST /v1/files/upload-urls`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `items` | ✓ |  | `[{"extension": "mp4", "type": "video"}, {"extension": "mp3", "type": "audio"}]` |

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
