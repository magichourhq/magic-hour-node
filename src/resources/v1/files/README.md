# v1-files

<!-- CUSTOM DOCS START -->

### Upload File <a name="upload-file"></a>

Upload a local file to Magic Hour Storage. The returned value is used for subsequent API calls.

#### Parameters

| Parameter | Required | Description                                                         | Example            |
| --------- | :------: | ------------------------------------------------------------------- | ------------------ |
| `file`    |    ✓     | A local file path, path like object, file URL, or file like object. | `"/tmp/image.png"` |

```typescript
import Client from "magic-hour";
import * as fs from "fs";
import * as path from "path";

const client = new Client({ token: process.env["API_TOKEN"]!! });

async function uploadExamples() {
  try {
    // Upload from file path
    const imagePath = await client.v1.files.uploadFile("/path/to/image.jpg");
    console.log(`Uploaded image: ${imagePath}`);

    // Upload from readable stream
    const videoStream = fs.createReadStream("./assets/video.mp4");
    const videoPath = await client.v1.files.uploadFile(videoStream);
    console.log(`Uploaded video: ${videoPath}`);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

uploadExamples();
```

<!-- CUSTOM DOCS END -->

## Submodules

- [upload-urls](upload-urls/README.md) - upload-urls
