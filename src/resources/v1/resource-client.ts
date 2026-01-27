import {
  CoreClient,
  CoreResourceClient,
  ResourceClientOptions,
} from "make-api-request-js";

import { AiClothesChangerClient } from "magic-hour/resources/v1/ai-clothes-changer";
import { AiFaceEditorClient } from "magic-hour/resources/v1/ai-face-editor";
import { AiGifGeneratorClient } from "magic-hour/resources/v1/ai-gif-generator";
import { AiHeadshotGeneratorClient } from "magic-hour/resources/v1/ai-headshot-generator";
import { AiImageEditorClient } from "magic-hour/resources/v1/ai-image-editor";
import { AiImageGeneratorClient } from "magic-hour/resources/v1/ai-image-generator";
import { AiImageUpscalerClient } from "magic-hour/resources/v1/ai-image-upscaler";
import { AiMemeGeneratorClient } from "magic-hour/resources/v1/ai-meme-generator";
import { AiQrCodeGeneratorClient } from "magic-hour/resources/v1/ai-qr-code-generator";
import { AiTalkingPhotoClient } from "magic-hour/resources/v1/ai-talking-photo";
import { AiVoiceClonerClient } from "magic-hour/resources/v1/ai-voice-cloner";
import { AiVoiceGeneratorClient } from "magic-hour/resources/v1/ai-voice-generator";
import { AnimationClient } from "magic-hour/resources/v1/animation";
import { AudioProjectsClient } from "magic-hour/resources/v1/audio-projects";
import { AutoSubtitleGeneratorClient } from "magic-hour/resources/v1/auto-subtitle-generator";
import { FaceDetectionClient } from "magic-hour/resources/v1/face-detection";
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
  private _aiVoiceClonerLazy?: AiVoiceClonerClient; // lazy-loading cache
  private _audioProjectsLazy?: AudioProjectsClient; // lazy-loading cache
  private _aiVoiceGeneratorLazy?: AiVoiceGeneratorClient; // lazy-loading cache
  private _imageProjectsLazy?: ImageProjectsClient; // lazy-loading cache
  private _videoProjectsLazy?: VideoProjectsClient; // lazy-loading cache
  private _faceDetectionLazy?: FaceDetectionClient; // lazy-loading cache
  private _aiClothesChangerLazy?: AiClothesChangerClient; // lazy-loading cache
  private _aiFaceEditorLazy?: AiFaceEditorClient; // lazy-loading cache
  private _aiGifGeneratorLazy?: AiGifGeneratorClient; // lazy-loading cache
  private _aiHeadshotGeneratorLazy?: AiHeadshotGeneratorClient; // lazy-loading cache
  private _aiImageEditorLazy?: AiImageEditorClient; // lazy-loading cache
  private _aiImageGeneratorLazy?: AiImageGeneratorClient; // lazy-loading cache
  private _aiImageUpscalerLazy?: AiImageUpscalerClient; // lazy-loading cache
  private _aiMemeGeneratorLazy?: AiMemeGeneratorClient; // lazy-loading cache

  private _aiQrCodeGeneratorLazy?: AiQrCodeGeneratorClient; // lazy-loading cache
  private _aiTalkingPhotoLazy?: AiTalkingPhotoClient; // lazy-loading cache
  private _animationLazy?: AnimationClient; // lazy-loading cache
  private _autoSubtitleGeneratorLazy?: AutoSubtitleGeneratorClient; // lazy-loading cache
  private _faceSwapLazy?: FaceSwapClient; // lazy-loading cache
  private _faceSwapPhotoLazy?: FaceSwapPhotoClient; // lazy-loading cache
  private _filesLazy?: FilesClient; // lazy-loading cache
  private _imageBackgroundRemoverLazy?: ImageBackgroundRemoverClient; // lazy-loading cache
  private _imageToVideoLazy?: ImageToVideoClient; // lazy-loading cache
  private _lipSyncLazy?: LipSyncClient; // lazy-loading cache
  private _photoColorizerLazy?: PhotoColorizerClient; // lazy-loading cache
  private _textToVideoLazy?: TextToVideoClient; // lazy-loading cache
  private _videoToVideoLazy?: VideoToVideoClient; // lazy-loading cache

  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.aiClothesChanger;
      this.aiFaceEditor;
      this.aiGifGenerator;
      this.aiHeadshotGenerator;
      this.aiImageEditor;
      this.aiImageGenerator;
      this.aiImageUpscaler;
      this.aiMemeGenerator;
      this.aiQrCodeGenerator;
      this.aiTalkingPhoto;
      this.aiVoiceCloner;
      this.aiVoiceGenerator;
      this.animation;
      this.audioProjects;
      this.autoSubtitleGenerator;
      this.faceDetection;
      this.faceSwap;
      this.faceSwapPhoto;
      this.files;
      this.imageBackgroundRemover;
      this.imageProjects;
      this.imageToVideo;
      this.lipSync;
      this.photoColorizer;
      this.textToVideo;
      this.videoProjects;
      this.videoToVideo;
    }
  }

  get imageProjects(): ImageProjectsClient {
    return (
      this._imageProjectsLazy ??
      (this._imageProjectsLazy =
        new (require("./image-projects").ImageProjectsClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get videoProjects(): VideoProjectsClient {
    return (
      this._videoProjectsLazy ??
      (this._videoProjectsLazy =
        new (require("./video-projects").VideoProjectsClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get faceDetection(): FaceDetectionClient {
    return (
      this._faceDetectionLazy ??
      (this._faceDetectionLazy =
        new (require("./face-detection").FaceDetectionClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiClothesChanger(): AiClothesChangerClient {
    return (
      this._aiClothesChangerLazy ??
      (this._aiClothesChangerLazy =
        new (require("./ai-clothes-changer").AiClothesChangerClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiFaceEditor(): AiFaceEditorClient {
    return (
      this._aiFaceEditorLazy ??
      (this._aiFaceEditorLazy =
        new (require("./ai-face-editor").AiFaceEditorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiGifGenerator(): AiGifGeneratorClient {
    return (
      this._aiGifGeneratorLazy ??
      (this._aiGifGeneratorLazy =
        new (require("./ai-gif-generator").AiGifGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiHeadshotGenerator(): AiHeadshotGeneratorClient {
    return (
      this._aiHeadshotGeneratorLazy ??
      (this._aiHeadshotGeneratorLazy =
        new (require("./ai-headshot-generator").AiHeadshotGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiImageEditor(): AiImageEditorClient {
    return (
      this._aiImageEditorLazy ??
      (this._aiImageEditorLazy =
        new (require("./ai-image-editor").AiImageEditorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiImageGenerator(): AiImageGeneratorClient {
    return (
      this._aiImageGeneratorLazy ??
      (this._aiImageGeneratorLazy =
        new (require("./ai-image-generator").AiImageGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiImageUpscaler(): AiImageUpscalerClient {
    return (
      this._aiImageUpscalerLazy ??
      (this._aiImageUpscalerLazy =
        new (require("./ai-image-upscaler").AiImageUpscalerClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiMemeGenerator(): AiMemeGeneratorClient {
    return (
      this._aiMemeGeneratorLazy ??
      (this._aiMemeGeneratorLazy =
        new (require("./ai-meme-generator").AiMemeGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiQrCodeGenerator(): AiQrCodeGeneratorClient {
    return (
      this._aiQrCodeGeneratorLazy ??
      (this._aiQrCodeGeneratorLazy =
        new (require("./ai-qr-code-generator").AiQrCodeGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiTalkingPhoto(): AiTalkingPhotoClient {
    return (
      this._aiTalkingPhotoLazy ??
      (this._aiTalkingPhotoLazy =
        new (require("./ai-talking-photo").AiTalkingPhotoClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get animation(): AnimationClient {
    return (
      this._animationLazy ??
      (this._animationLazy = new (require("./animation").AnimationClient)(
        this._client,
        this._opts,
      ))
    );
  }

  get autoSubtitleGenerator(): AutoSubtitleGeneratorClient {
    return (
      this._autoSubtitleGeneratorLazy ??
      (this._autoSubtitleGeneratorLazy =
        new (require("./auto-subtitle-generator").AutoSubtitleGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get faceSwap(): FaceSwapClient {
    return (
      this._faceSwapLazy ??
      (this._faceSwapLazy = new (require("./face-swap").FaceSwapClient)(
        this._client,
        this._opts,
      ))
    );
  }

  get faceSwapPhoto(): FaceSwapPhotoClient {
    return (
      this._faceSwapPhotoLazy ??
      (this._faceSwapPhotoLazy =
        new (require("./face-swap-photo").FaceSwapPhotoClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get files(): FilesClient {
    return (
      this._filesLazy ??
      (this._filesLazy = new (require("./files").FilesClient)(
        this._client,
        this._opts,
      ))
    );
  }

  get imageBackgroundRemover(): ImageBackgroundRemoverClient {
    return (
      this._imageBackgroundRemoverLazy ??
      (this._imageBackgroundRemoverLazy =
        new (require("./image-background-remover").ImageBackgroundRemoverClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get imageToVideo(): ImageToVideoClient {
    return (
      this._imageToVideoLazy ??
      (this._imageToVideoLazy =
        new (require("./image-to-video").ImageToVideoClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get lipSync(): LipSyncClient {
    return (
      this._lipSyncLazy ??
      (this._lipSyncLazy = new (require("./lip-sync").LipSyncClient)(
        this._client,
        this._opts,
      ))
    );
  }

  get photoColorizer(): PhotoColorizerClient {
    return (
      this._photoColorizerLazy ??
      (this._photoColorizerLazy =
        new (require("./photo-colorizer").PhotoColorizerClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get textToVideo(): TextToVideoClient {
    return (
      this._textToVideoLazy ??
      (this._textToVideoLazy =
        new (require("./text-to-video").TextToVideoClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get videoToVideo(): VideoToVideoClient {
    return (
      this._videoToVideoLazy ??
      (this._videoToVideoLazy =
        new (require("./video-to-video").VideoToVideoClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiVoiceGenerator(): AiVoiceGeneratorClient {
    return (
      this._aiVoiceGeneratorLazy ??
      (this._aiVoiceGeneratorLazy =
        new (require("./ai-voice-generator").AiVoiceGeneratorClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get audioProjects(): AudioProjectsClient {
    return (
      this._audioProjectsLazy ??
      (this._audioProjectsLazy =
        new (require("./audio-projects").AudioProjectsClient)(
          this._client,
          this._opts,
        ))
    );
  }

  get aiVoiceCloner(): AiVoiceClonerClient {
    return (
      this._aiVoiceClonerLazy ??
      (this._aiVoiceClonerLazy =
        new (require("./ai-voice-cloner").AiVoiceClonerClient)(
          this._client,
          this._opts,
        ))
    );
  }
}
