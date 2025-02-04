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

> **Warning**: any API call that renders a video will utilize frames in your account.

## Module Documentation and Snippets

### [v1.ai_clothes_changer](src/resources/v1/ai-clothes-changer/README.md)

- [create](src/resources/v1/ai-clothes-changer/README.md#create) - AI Clothes Changer

### [v1.ai_headshot_generator](src/resources/v1/ai-headshot-generator/README.md)

- [create](src/resources/v1/ai-headshot-generator/README.md#create) - AI Headshots

### [v1.ai_image_generator](src/resources/v1/ai-image-generator/README.md)

- [create](src/resources/v1/ai-image-generator/README.md#create) - AI Images

### [v1.ai_image_upscaler](src/resources/v1/ai-image-upscaler/README.md)

- [create](src/resources/v1/ai-image-upscaler/README.md#create) - AI Image Upscaler

### [v1.ai_photo_editor](src/resources/v1/ai-photo-editor/README.md)

- [create](src/resources/v1/ai-photo-editor/README.md#create) - AI Photo Editor

### [v1.ai_qr_code_generator](src/resources/v1/ai-qr-code-generator/README.md)

- [create](src/resources/v1/ai-qr-code-generator/README.md#create) - AI QR Code

### [v1.animation](src/resources/v1/animation/README.md)

- [create](src/resources/v1/animation/README.md#create) - Animation

### [v1.face_swap](src/resources/v1/face-swap/README.md)

- [create](src/resources/v1/face-swap/README.md#create) - Face Swap video

### [v1.face_swap_photo](src/resources/v1/face-swap-photo/README.md)

- [create](src/resources/v1/face-swap-photo/README.md#create) - Face Swap Photo

### [v1.files.upload_urls](src/resources/v1/files/upload-urls/README.md)

- [create](src/resources/v1/files/upload-urls/README.md#create) - Generate asset upload urls

### [v1.image_background_remover](src/resources/v1/image-background-remover/README.md)

- [create](src/resources/v1/image-background-remover/README.md#create) - Image Background Remover

### [v1.image_projects](src/resources/v1/image-projects/README.md)

- [delete](src/resources/v1/image-projects/README.md#delete) - Delete image
- [get](src/resources/v1/image-projects/README.md#get) - Get image details

### [v1.image_to_video](src/resources/v1/image-to-video/README.md)

- [create](src/resources/v1/image-to-video/README.md#create) - Image-to-Video

### [v1.lip_sync](src/resources/v1/lip-sync/README.md)

- [create](src/resources/v1/lip-sync/README.md#create) - Lip Sync

### [v1.text_to_video](src/resources/v1/text-to-video/README.md)

- [create](src/resources/v1/text-to-video/README.md#create) - Text-to-Video

### [v1.video_projects](src/resources/v1/video-projects/README.md)

- [delete](src/resources/v1/video-projects/README.md#delete) - Delete video
- [get](src/resources/v1/video-projects/README.md#get) - Get video details

### [v1.video_to_video](src/resources/v1/video-to-video/README.md)

- [create](src/resources/v1/video-to-video/README.md#create) - Video-to-Video

<!-- MODULE DOCS END -->
