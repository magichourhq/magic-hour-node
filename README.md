# Magic Hour Node SDK

[![NPM Version](https://img.shields.io/npm/v/magic-hour)](https://www.npmjs.com/package/magic-hour)

The Magic Hour Node SDK provides convenient access to the Magic Hour API via server-side TypeScript or JavaScript.

## Documentation

For full documentation of all APIs, please visit https://docs.magichour.ai

If you have any questions, please reach out to us via [discord](https://discord.gg/JX5rgsZaJp).

## Install

```
npm install magic-hour
```

## Usage

```ts
import Client from "magic-hour";
// generate your API Key at https://magichour.ai/developer
const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.faceSwapPhoto.generate(
  {
    assets: {
      faceSwapMode: "all-faces",
      sourceFilePath: "/path/to/source/image.png",
      targetFilePath: "/path/to/target/image.png",
    },
    name: "Face Swap image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);

console.log(`Project ID: ${response.id}`);
console.log(`Status: ${response.status}`);
console.log(`Downloaded files: ${response.downloaded_paths}`);
```

## Client Functions

Most resources that generate media content support two methods:

- **`generate()`** - A high-level convenience method that handles the entire workflow
- **`create()`** - A low-level method that only initiates the generation process

### Generate Function

The `generate()` function provides a complete end-to-end solution:

- Uploads local files to Magic Hour storage
- Calls the API to start generation
- Automatically polls for completion
- Downloads generated files to your local machine
- Returns both API response data and local file paths

**Additional Parameters:**

- `waitForCompletion` (boolean, default true): Whether to wait for the project to complete
- `downloadOutputs` (boolean, default true): Whether to download the generated files
- `downloadDirectory` (string, optional): Directory to save downloaded files (defaults to current directory)

```ts
const response = await client.v1.faceSwapPhoto.generate(
  {
    assets: {
      faceSwapMode: "all-faces",
      sourceFilePath: "/path/to/source/image.png",
      targetFilePath: "/path/to/target/image.png",
    },
    name: "Face Swap image",
  },
  {
    waitForCompletion: true, // Wait for status to be complete/error/canceled
    downloadOutputs: true, // Download files automatically
    downloadDirectory: "./outputs/", // Where to save files
  },
);

// You get both the API response AND downloaded file paths
console.log(`Project ID: ${response.id}`);
console.log(`Status: ${response.status}`);
console.log(`Downloaded files: ${response.downloadedPaths}`);
```

### Create Function

The `create()` function provides granular control:

- Only calls the API to start the generation process
- Returns immediately with a project ID and amount of credits used
- Requires manual status checking and file downloading

```ts
// upload the files to Magic Hour's storage or you can use direct URLs
const sourceFilePath = await client.v1.files.uploadFile(
  "/path/to/source/image.png",
);
const targetFilePath = await client.v1.files.uploadFile(
  "/path/to/target/image.png",
);

// Create function - only starts the process
const createResponse = await client.v1.faceSwapPhoto.create({
  assets: {
    faceSwapMode: "all-faces",
    sourceFilePath: sourceFilePath,
    targetFilePath: targetFilePath,
  },
  name: "Face Swap image",
});

// You get just the project ID and initial response
const projectId = createResponse.id;
console.log(`Started project: ${projectId}`);

// You must handle the rest:
// 1. Poll for completion using the image/video projects API
const result = await client.v1.imageProjects.checkResults(projectId, {
  waitForCompletion: true,
  downloadOutputs: false,
});

// 2. Download files using the download URLs
const downloadUrls = result.downloads;
// Download the files using your preferred method
```

### Choosing Between Which Function to Use

**Use `generate()` when:**

- You want a simple, one-call solution
- You're building a straightforward application
- You don't need custom polling or download logic

**Use `create()` when:**

- You need custom status checking logic
- You're integrating with existing job processing systems
- You want to separate generation initiation from completion handling
- You need fine-grained control over the entire workflow

## Error Handling

The Magic Hour SDK includes the `ApiError` class, which includes the request and response data.

### Basic Error Handling

```ts
try {
  await client.v1.imageToVideo.generate({
    assets: {
      imageFilePath: "/Users/dhu/Desktop/test-files/suit.jpg",
    },
    endSeconds: 0,
  });
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.message}`); // API Error: 400 was returned from post /v1/image-to-video

    try {
      const errorData = await error.response.json();
      console.error(`Error Message: ${errorData.message}`); // Error Message: end_seconds must be at least 5
    } catch (parseError) {
      console.error("Could not parse error response");
    }
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## Logging

### Logging Levels

- `none` - Disable all logging
- `error` - Only error messages
- `warn` - Warnings and errors
- `info` - Info, warnings, and errors
- `debug` - All messages including request/response details

### Environment Variable Configuration

You can also configure the logging level using the `MAGIC_HOUR_LOG_LEVEL` environment variable:

```bash
export MAGIC_HOUR_LOG_LEVEL=debug  # Enable debug logging
# or
export MAGIC_HOUR_LOG_LEVEL=error  # Only show errors
```

Valid values are: `none`, `error`, `warn`, `info`, `debug` (case insensitive). If not set, defaults to `info`.

## Module Documentation and Snippets

### [v1.aiClothesChanger](src/resources/v1/ai-clothes-changer/README.md)

- [create](src/resources/v1/ai-clothes-changer/README.md#create) - AI Clothes Changer
- [generate](src/resources/v1/ai-clothes-changer/README.md#generate) - AI Clothes Changer Generate Workflow

### [v1.aiFaceEditor](src/resources/v1/ai-face-editor/README.md)

- [create](src/resources/v1/ai-face-editor/README.md#create) - AI Face Editor
- [generate](src/resources/v1/ai-face-editor/README.md#generate) - AI Face Editor Generate Workflow

### [v1.aiGifGenerator](src/resources/v1/ai-gif-generator/README.md)

- [create](src/resources/v1/ai-gif-generator/README.md#create) - AI GIF Generator
- [generate](src/resources/v1/ai-gif-generator/README.md#generate) - AI Gif Generator Generate Workflow

### [v1.aiHeadshotGenerator](src/resources/v1/ai-headshot-generator/README.md)

- [create](src/resources/v1/ai-headshot-generator/README.md#create) - AI Headshot Generator
- [generate](src/resources/v1/ai-headshot-generator/README.md#generate) - AI Headshot Generator Generate Workflow

### [v1.aiImageEditor](src/resources/v1/ai-image-editor/README.md)

- [create](src/resources/v1/ai-image-editor/README.md#create) - AI Image Editor
- [generate](src/resources/v1/ai-image-editor/README.md#generate) - AI Image Editor Generate Workflow

### [v1.aiImageGenerator](src/resources/v1/ai-image-generator/README.md)

- [create](src/resources/v1/ai-image-generator/README.md#create) - AI Image Generator
- [generate](src/resources/v1/ai-image-generator/README.md#generate) - AI Image Generator Generate Workflow

### [v1.aiImageUpscaler](src/resources/v1/ai-image-upscaler/README.md)

- [create](src/resources/v1/ai-image-upscaler/README.md#create) - AI Image Upscaler
- [generate](src/resources/v1/ai-image-upscaler/README.md#generate) - AI Image Upscaler Generate Workflow

### [v1.aiMemeGenerator](src/resources/v1/ai-meme-generator/README.md)

- [create](src/resources/v1/ai-meme-generator/README.md#create) - AI Meme Generator
- [generate](src/resources/v1/ai-meme-generator/README.md#generate) - AI Meme Generator Generate Workflow

### [v1.aiQrCodeGenerator](src/resources/v1/ai-qr-code-generator/README.md)

- [create](src/resources/v1/ai-qr-code-generator/README.md#create) - AI QR Code Generator
- [generate](src/resources/v1/ai-qr-code-generator/README.md#generate) - AI Qr Code Generator Generate Workflow

### [v1.aiTalkingPhoto](src/resources/v1/ai-talking-photo/README.md)

- [create](src/resources/v1/ai-talking-photo/README.md#create) - AI Talking Photo
- [generate](src/resources/v1/ai-talking-photo/README.md#generate) - AI Talking Photo Generate Workflow

### [v1.aiVoiceCloner](src/resources/v1/ai-voice-cloner/README.md)

- [create](src/resources/v1/ai-voice-cloner/README.md#create) - AI Voice Cloner
- [generate](src/resources/v1/ai-voice-cloner/README.md#generate) - AI Voice Cloner Workflow

### [v1.aiVoiceGenerator](src/resources/v1/ai-voice-generator/README.md)

- [create](src/resources/v1/ai-voice-generator/README.md#create) - AI Voice Generator
- [generate](src/resources/v1/ai-voice-generator/README.md#generate) - AI Voice Generate Workflow

### [v1.animation](src/resources/v1/animation/README.md)

- [create](src/resources/v1/animation/README.md#create) - Animation
- [generate](src/resources/v1/animation/README.md#generate) - Animation Generate Workflow

### [v1.audioProjects](src/resources/v1/audio-projects/README.md)

- [check-result](src/resources/v1/audio-projects/README.md#check-result) - Check results
- [delete](src/resources/v1/audio-projects/README.md#delete) - Delete audio
- [get](src/resources/v1/audio-projects/README.md#get) - Get audio details

### [v1.autoSubtitleGenerator](src/resources/v1/auto-subtitle-generator/README.md)

- [create](src/resources/v1/auto-subtitle-generator/README.md#create) - Auto Subtitle Generator
- [generate](src/resources/v1/auto-subtitle-generator/README.md#generate) - Auto Subtitle Generator Generate Workflow

### [v1.faceDetection](src/resources/v1/face-detection/README.md)

- [create](src/resources/v1/face-detection/README.md#create) - Face Detection
- [generate](src/resources/v1/face-detection/README.md#generate) - Face Detection Generate Workflow
- [get](src/resources/v1/face-detection/README.md#get) - Get face detection details

### [v1.faceSwap](src/resources/v1/face-swap/README.md)

- [create](src/resources/v1/face-swap/README.md#create) - Face Swap Video
- [generate](src/resources/v1/face-swap/README.md#generate) - Face Swap Generate Workflow

### [v1.faceSwapPhoto](src/resources/v1/face-swap-photo/README.md)

- [create](src/resources/v1/face-swap-photo/README.md#create) - Face Swap Photo
- [generate](src/resources/v1/face-swap-photo/README.md#generate) - Face Swap Photo Generate Workflow

### [v1.files](src/resources/v1/files/README.md)

- [upload-file](src/resources/v1/files/README.md#upload-file) - Upload File

### [v1.files.uploadUrls](src/resources/v1/files/upload-urls/README.md)

- [create](src/resources/v1/files/upload-urls/README.md#create) - Generate asset upload urls

### [v1.imageBackgroundRemover](src/resources/v1/image-background-remover/README.md)

- [create](src/resources/v1/image-background-remover/README.md#create) - Image Background Remover
- [generate](src/resources/v1/image-background-remover/README.md#generate) - Image Background Remover Generate Workflow

### [v1.imageProjects](src/resources/v1/image-projects/README.md)

- [check-result](src/resources/v1/image-projects/README.md#check-result) - Check results
- [delete](src/resources/v1/image-projects/README.md#delete) - Delete image
- [get](src/resources/v1/image-projects/README.md#get) - Get image details

### [v1.imageToVideo](src/resources/v1/image-to-video/README.md)

- [create](src/resources/v1/image-to-video/README.md#create) - Image-to-Video
- [generate](src/resources/v1/image-to-video/README.md#generate) - Image To Video Generate Workflow

### [v1.lipSync](src/resources/v1/lip-sync/README.md)

- [create](src/resources/v1/lip-sync/README.md#create) - Lip Sync
- [generate](src/resources/v1/lip-sync/README.md#generate) - Lip Sync Generate Workflow

### [v1.photoColorizer](src/resources/v1/photo-colorizer/README.md)

- [create](src/resources/v1/photo-colorizer/README.md#create) - Photo Colorizer
- [generate](src/resources/v1/photo-colorizer/README.md#generate) - Photo Colorizer Generate Workflow

### [v1.textToVideo](src/resources/v1/text-to-video/README.md)

- [create](src/resources/v1/text-to-video/README.md#create) - Text-to-Video
- [generate](src/resources/v1/text-to-video/README.md#generate) - Text To Video Generate Workflow

### [v1.videoProjects](src/resources/v1/video-projects/README.md)

- [check-result](src/resources/v1/video-projects/README.md#check-result) - Check results
- [delete](src/resources/v1/video-projects/README.md#delete) - Delete video
- [get](src/resources/v1/video-projects/README.md#get) - Get video details

### [v1.videoToVideo](src/resources/v1/video-to-video/README.md)

- [create](src/resources/v1/video-to-video/README.md#create) - Video-to-Video
- [generate](src/resources/v1/video-to-video/README.md#generate) - Video To Video Generate Workflow

<!-- MODULE DOCS END -->
