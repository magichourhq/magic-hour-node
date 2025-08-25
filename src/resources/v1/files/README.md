# v1-files

<!-- CUSTOM DOCS START -->

### Upload File <a name="upload-file"></a>

Upload a local file to Magic Hour Storage. The returned value is used for subsequent API calls.

#### Parameters

| Parameter | Required | Description                                                         | Example            |
| --------- | :------: | ------------------------------------------------------------------- | ------------------ |
| `file`    |    ✓     | A local file path, path like object, file URL, or file like object. | `"/tmp/image.png"` |

#### Synchronous Client


```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env.MAGIC_HOUR_API_TOKEN });

// Upload from file path
const filePath = await client.v1.files.uploadFile("/path/to/your/image.jpg");
console.log(`Uploaded file: ${filePath}`);

// Use the uploaded file in other API calls
const result = await client.v1.aiImageUpscaler.create({
  assets: { imageFilePath: filePath },
  style: { upscaleFactor: 2 }
});
```

<!-- CUSTOM DOCS END -->

## Submodules
- [upload-urls](upload-urls/README.md) - upload-urls

