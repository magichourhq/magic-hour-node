import { CoreClient, CoreResourceClient } from "magic-hour/core";
import { AiClothesChangerClient } from "magic-hour/resources/v1/ai-clothes-changer";
import { AiFaceEditorClient } from "magic-hour/resources/v1/ai-face-editor";
import { AiHeadshotGeneratorClient } from "magic-hour/resources/v1/ai-headshot-generator";
import { AiImageGeneratorClient } from "magic-hour/resources/v1/ai-image-generator";
import { AiImageUpscalerClient } from "magic-hour/resources/v1/ai-image-upscaler";
import { AiMemeGeneratorClient } from "magic-hour/resources/v1/ai-meme-generator";
import { AiPhotoEditorClient } from "magic-hour/resources/v1/ai-photo-editor";
import { AiQrCodeGeneratorClient } from "magic-hour/resources/v1/ai-qr-code-generator";
import { AiTalkingPhotoClient } from "magic-hour/resources/v1/ai-talking-photo";
import { AnimationClient } from "magic-hour/resources/v1/animation";
import { FaceSwapClient } from "magic-hour/resources/v1/face-swap";
import { FaceSwapPhotoClient } from "magic-hour/resources/v1/face-swap-photo";
import { FilesClient } from "magic-hour/resources/v1/files";
import { ImageBackgroundRemoverClient } from "magic-hour/resources/v1/image-background-remover";
import { ImageProjectsClient } from "magic-hour/resources/v1/image-projects";
import { ImageToVideoClient } from "magic-hour/resources/v1/image-to-video";
import { LipSyncClient } from "magic-hour/resources/v1/lip-sync";
import { PhotoColorizerClient } from "magic-hour/resources/v1/photo-colorizer";
import { TextToVideoClient } from "magic-hour/resources/v1/text-to-video";
import { VideoProjectsClient } from "magic-hour/resources/v1/video-projects";
import { VideoToVideoClient } from "magic-hour/resources/v1/video-to-video";

export class V1Client extends CoreResourceClient {
  imageProjects: ImageProjectsClient;
  videoProjects: VideoProjectsClient;
  aiClothesChanger: AiClothesChangerClient;
  aiFaceEditor: AiFaceEditorClient;
  aiHeadshotGenerator: AiHeadshotGeneratorClient;
  aiImageGenerator: AiImageGeneratorClient;
  aiImageUpscaler: AiImageUpscalerClient;
  aiMemeGenerator: AiMemeGeneratorClient;
  aiPhotoEditor: AiPhotoEditorClient;
  aiQrCodeGenerator: AiQrCodeGeneratorClient;
  aiTalkingPhoto: AiTalkingPhotoClient;
  animation: AnimationClient;
  faceSwap: FaceSwapClient;
  faceSwapPhoto: FaceSwapPhotoClient;
  files: FilesClient;
  imageBackgroundRemover: ImageBackgroundRemoverClient;
  imageToVideo: ImageToVideoClient;
  lipSync: LipSyncClient;
  photoColorizer: PhotoColorizerClient;
  textToVideo: TextToVideoClient;
  videoToVideo: VideoToVideoClient;

  constructor(client: CoreClient) {
    super(client);

    this.imageProjects = new ImageProjectsClient(this._client);
    this.videoProjects = new VideoProjectsClient(this._client);
    this.aiClothesChanger = new AiClothesChangerClient(this._client);
    this.aiFaceEditor = new AiFaceEditorClient(this._client);
    this.aiHeadshotGenerator = new AiHeadshotGeneratorClient(this._client);
    this.aiImageGenerator = new AiImageGeneratorClient(this._client);
    this.aiImageUpscaler = new AiImageUpscalerClient(this._client);
    this.aiMemeGenerator = new AiMemeGeneratorClient(this._client);
    this.aiPhotoEditor = new AiPhotoEditorClient(this._client);
    this.aiQrCodeGenerator = new AiQrCodeGeneratorClient(this._client);
    this.aiTalkingPhoto = new AiTalkingPhotoClient(this._client);
    this.animation = new AnimationClient(this._client);
    this.faceSwap = new FaceSwapClient(this._client);
    this.faceSwapPhoto = new FaceSwapPhotoClient(this._client);
    this.files = new FilesClient(this._client);
    this.imageBackgroundRemover = new ImageBackgroundRemoverClient(
      this._client,
    );
    this.imageToVideo = new ImageToVideoClient(this._client);
    this.lipSync = new LipSyncClient(this._client);
    this.photoColorizer = new PhotoColorizerClient(this._client);
    this.textToVideo = new TextToVideoClient(this._client);
    this.videoToVideo = new VideoToVideoClient(this._client);
  }
}
