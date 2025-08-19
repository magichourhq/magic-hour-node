### File Uploading

The client provides an easy way to upload media files to Magic Hour's cloud storage. Once uploaded, files receive a unique path that can be referenced across other Magic Hour API endpoints.

```typescript
import Client from "magic-hour";
import * as fs from "fs";
import * as path from "path";

const client = new Client({token: process.env["API_TOKEN"]!!});

async function uploadExamples() {
  try {
    // Upload from file path
    const imagePath = await client.v1.files.uploadFile("/path/to/image.jpg");
    console.log(`Uploaded image: ${imagePath}`);

    // Upload from readable stream
    const videoStream = fs.createReadStream("./assets/video.mp4");
    const videoPath = await client.v1.files.uploadFile(videoStream);
    console.log(`Uploaded video: ${videoPath}`);

    // Use uploaded files in other API endpoints
    const result = await client.v1.aiImageUpscaler.create({
      assets: {imageFilePath: imagePath},
      style: {upscaleFactor: 2},
    });

    console.log(`Upscaled image: ${result.videoPath}`);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

uploadExamples();
```
