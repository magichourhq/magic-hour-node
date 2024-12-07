
### create <a name="create"></a>
AI Photo Editor

> **NOTE**: this API is still in early development stages, and should be avoided. Please reach out to us if you're interested in this API. 

Edit photo using AI. Each photo costs 10 frames.

**API Endpoint**: `POST /v1/ai-photo-editor`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.aiPhotoEditor.create({
  data: {
    assets: { image_file_path: "image/id/1234.png" },
    name: "Photo Editor image",
    resolution: 768,
    steps: 123,
    style: {
      image_description: "A photo of a person",
      likeness_strength: 5.2,
      negative_prompt: "painting, cartoon, sketch",
      prompt: "A photo portrait of a person wearing a hat",
      prompt_strength: 3.75,
      steps: 4,
    },
  },
});
```

**Upgrade to see all examples**
