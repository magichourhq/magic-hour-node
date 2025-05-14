
### AI Photo Editor <a name="create"></a>

> **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API. 

Edit photo using AI. Each photo costs 10 credits.

**API Endpoint**: `POST /v1/ai-photo-editor`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiPhotoEditor.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Photo Editor image",
  resolution: 768,
  style: {
    imageDescription: "A photo of a person",
    likenessStrength: 5.2,
    negativePrompt: "painting, cartoon, sketch",
    prompt: "A photo portrait of a person wearing a hat",
    promptStrength: 3.75,
    steps: 4,
    upscaleFactor: 2,
    upscaleFidelity: 0.5,
  },
});
```
