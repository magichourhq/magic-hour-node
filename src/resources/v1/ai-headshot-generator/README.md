# v1-aiheadshotgenerator

## Module Functions
### AI Headshots <a name="create"></a>

Create an AI headshot. Each headshot costs 50 credits.

**API Endpoint**: `POST /v1/ai-headshot-generator`

#### Parameters

| Parameter | Required | Description | Example |
|-----------|:--------:|-------------|--------|
| `assets` | ✓ | Provide the assets for headshot photo | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` | ✓ | The image used to generate the headshot. This image must contain one detectable face. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).  Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.  | `"api-assets/id/1234.png"` |
| `name` | ✗ | The name of image. This value is mainly used for your own identification of the image. | `"Ai Headshot image"` |
| `style` | ✗ |  | `{}` |
| `└─ prompt` | ✗ | Prompt used to guide the style of your headshot. We recommend omitting the prompt unless you want to customize your headshot. You can visit [AI headshot generator](https://magichour.ai/create/ai-headshot-generator) to view an example of a good prompt used for our 'Professional' style. | `"string"` |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiHeadshotGenerator.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "Ai Headshot image",
});

```

#### Response

##### Type
[V1AiHeadshotGeneratorCreateResponse](/src/types/v1-ai-headshot-generator-create-response.ts)

##### Example
`{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}`

