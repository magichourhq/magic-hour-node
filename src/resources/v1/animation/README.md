
### create <a name="create"></a>
Create Animation

Create a Animation video. The estimated frame cost is calculated based on the `fps` and `end_seconds` input.

**API Endpoint**: `POST /v1/animation`

#### Example Snippet

```typescript
import Client, { types } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.animation.create({
  data: {
    assets: {
      audio_file_path: "api-assets/id/1234.mp3",
      audio_source: types.PostV1AnimationBodyAssetsAudioSourceEnum.File,
      image_file_path: "api-assets/id/1234.png",
      youtube_url: "http://www.example.com",
    },
    end_seconds: 15,
    fps: 12,
    height: 960,
    name: "Animation video",
    style: {
      art_style:
        types.PostV1AnimationBodyStyleArtStyleEnum.PainterlyIllustration,
      art_style_custom: "string",
      camera_effect: types.PostV1AnimationBodyStyleCameraEffectEnum.Accelerate,
      prompt: "Cyberpunk city",
      prompt_type: types.PostV1AnimationBodyStylePromptTypeEnum.AiChoose,
      transition_speed: 5,
    },
    width: 512,
  },
});
```

**Upgrade to see all examples**
