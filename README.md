# Magic Hour Typescript SDK

[![NPM Version](https://img.shields.io/npm/v/magic-hour)](https://www.npmjs.com/package/magic-hour)

Magic Hour provides an API (beta) that can be integrated into your own application to generate videos and images using AI.

Webhook documentation can be found [here](https://magichour.ai/docs/webhook).

If you have any questions, please reach out to us via [discord](https://discord.gg/JX5rgsZaJp).

## Install

```
npm install magic-hour
```

## Usage

Initialize the client

```ts
import Client from "magic-hour";

// generate your API Key at https://magichour.ai/developer
const client = new Client({
  token: "my api key",
});
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

> [!WARNING]
> Any API call that renders a video will utilize frames in your account.

## Module Documentation and Snippets

### [v1](src/resources/v1/README.md)


### [v1.aiClothesChanger](src/resources/v1/ai-clothes-changer/README.md)

* [create](src/resources/v1/ai-clothes-changer/README.md#create) - AI Clothes Changer
* [generate](src/resources/v1/ai-clothes-changer/README.md#generate) - AI Clothes Changer Generate Workflow

### [v1.aiFaceEditor](src/resources/v1/ai-face-editor/README.md)

* [create](src/resources/v1/ai-face-editor/README.md#create) - AI Face Editor
* [generate](src/resources/v1/ai-face-editor/README.md#generate) - AI Face Editor Generate Workflow

### [v1.aiGifGenerator](src/resources/v1/ai-gif-generator/README.md)

* [create](src/resources/v1/ai-gif-generator/README.md#create) - AI GIFs
* [generate](src/resources/v1/ai-gif-generator/README.md#generate) - AI Gif Generator Generate Workflow

### [v1.aiHeadshotGenerator](src/resources/v1/ai-headshot-generator/README.md)

* [create](src/resources/v1/ai-headshot-generator/README.md#create) - AI Headshots
* [generate](src/resources/v1/ai-headshot-generator/README.md#generate) - AI Headshot Generator Generate Workflow

### [v1.aiImageEditor](src/resources/v1/ai-image-editor/README.md)

* [create](src/resources/v1/ai-image-editor/README.md#create) - AI Image Editor
* [generate](src/resources/v1/ai-image-editor/README.md#generate) - AI Image Editor Generate Workflow

### [v1.aiImageGenerator](src/resources/v1/ai-image-generator/README.md)

* [create](src/resources/v1/ai-image-generator/README.md#create) - AI Images
* [generate](src/resources/v1/ai-image-generator/README.md#generate) - AI Image Generator Generate Workflow

### [v1.aiImageUpscaler](src/resources/v1/ai-image-upscaler/README.md)

* [create](src/resources/v1/ai-image-upscaler/README.md#create) - AI Image Upscaler
* [generate](src/resources/v1/ai-image-upscaler/README.md#generate) - AI Image Upscaler Generate Workflow

### [v1.aiMemeGenerator](src/resources/v1/ai-meme-generator/README.md)

* [create](src/resources/v1/ai-meme-generator/README.md#create) - AI Meme Generator
* [generate](src/resources/v1/ai-meme-generator/README.md#generate) - AI Meme Generator Generate Workflow

### [v1.aiPhotoEditor](src/resources/v1/ai-photo-editor/README.md)

* [create](src/resources/v1/ai-photo-editor/README.md#create) - AI Photo Editor
* [generate](src/resources/v1/ai-photo-editor/README.md#generate) - AI Photo Editor Generate Workflow

### [v1.aiQrCodeGenerator](src/resources/v1/ai-qr-code-generator/README.md)

* [create](src/resources/v1/ai-qr-code-generator/README.md#create) - AI QR Code
* [generate](src/resources/v1/ai-qr-code-generator/README.md#generate) - AI Qr Code Generator Generate Workflow

### [v1.aiTalkingPhoto](src/resources/v1/ai-talking-photo/README.md)

* [create](src/resources/v1/ai-talking-photo/README.md#create) - AI Talking Photo
* [generate](src/resources/v1/ai-talking-photo/README.md#generate) - AI Talking Photo Generate Workflow

### [v1.animation](src/resources/v1/animation/README.md)

* [create](src/resources/v1/animation/README.md#create) - Animation
* [generate](src/resources/v1/animation/README.md#generate) - Animation Generate Workflow

### [v1.autoSubtitleGenerator](src/resources/v1/auto-subtitle-generator/README.md)

* [create](src/resources/v1/auto-subtitle-generator/README.md#create) - Auto Subtitle Generator
* [generate](src/resources/v1/auto-subtitle-generator/README.md#generate) - Auto Subtitle Generator Generate Workflow

### [v1.faceDetection](src/resources/v1/face-detection/README.md)

* [create](src/resources/v1/face-detection/README.md#create) - Face Detection
* [generate](src/resources/v1/face-detection/README.md#generate) - Face Detection Generate Workflow
* [get](src/resources/v1/face-detection/README.md#get) - Get face detection details

### [v1.faceSwap](src/resources/v1/face-swap/README.md)

* [create](src/resources/v1/face-swap/README.md#create) - Face Swap video
* [generate](src/resources/v1/face-swap/README.md#generate) - Face Swap Generate Workflow

### [v1.faceSwapPhoto](src/resources/v1/face-swap-photo/README.md)

* [create](src/resources/v1/face-swap-photo/README.md#create) - Face Swap Photo
* [generate](src/resources/v1/face-swap-photo/README.md#generate) - Face Swap Photo Generate Workflow

### [v1.files](src/resources/v1/files/README.md)

* [upload-file](src/resources/v1/files/README.md#upload-file) - Upload File

### [v1.files.uploadUrls](src/resources/v1/files/upload-urls/README.md)

* [create](src/resources/v1/files/upload-urls/README.md#create) - Generate asset upload urls

### [v1.imageBackgroundRemover](src/resources/v1/image-background-remover/README.md)

* [create](src/resources/v1/image-background-remover/README.md#create) - Image Background Remover
* [generate](src/resources/v1/image-background-remover/README.md#generate) - Image Background Remover Generate Workflow

### [v1.imageProjects](src/resources/v1/image-projects/README.md)

* [check-result](src/resources/v1/image-projects/README.md#check-result) - Check results
* [delete](src/resources/v1/image-projects/README.md#delete) - Delete image
* [get](src/resources/v1/image-projects/README.md#get) - Get image details

### [v1.imageToVideo](src/resources/v1/image-to-video/README.md)

* [create](src/resources/v1/image-to-video/README.md#create) - Image-to-Video
* [generate](src/resources/v1/image-to-video/README.md#generate) - Image To Video Generate Workflow

### [v1.lipSync](src/resources/v1/lip-sync/README.md)

* [create](src/resources/v1/lip-sync/README.md#create) - Lip Sync
* [generate](src/resources/v1/lip-sync/README.md#generate) - Lip Sync Generate Workflow

### [v1.photoColorizer](src/resources/v1/photo-colorizer/README.md)

* [create](src/resources/v1/photo-colorizer/README.md#create) - Photo Colorizer
* [generate](src/resources/v1/photo-colorizer/README.md#generate) - Photo Colorizer Generate Workflow

### [v1.textToVideo](src/resources/v1/text-to-video/README.md)

* [create](src/resources/v1/text-to-video/README.md#create) - Text-to-Video
* [generate](src/resources/v1/text-to-video/README.md#generate) - Text To Video Generate Workflow

### [v1.videoProjects](src/resources/v1/video-projects/README.md)

* [check-result](src/resources/v1/video-projects/README.md#check-result) - Check results
* [delete](src/resources/v1/video-projects/README.md#delete) - Delete video
* [get](src/resources/v1/video-projects/README.md#get) - Get video details

### [v1.videoToVideo](src/resources/v1/video-to-video/README.md)

* [create](src/resources/v1/video-to-video/README.md#create) - Video-to-Video
* [generate](src/resources/v1/video-to-video/README.md#generate) - Video To Video Generate Workflow

<!-- MODULE DOCS END -->
