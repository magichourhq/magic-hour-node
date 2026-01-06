# v1.ai-clothes-changer

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Clothes Changer Generate Workflow <a name="generate"></a>

The workflow performs the following action

1. upload local assets to Magic Hour storage. So you can pass in a local path instead of having to upload files yourself
2. trigger a generation
3. poll for a completion status. This is configurable
4. if success, download the output to local directory

> [!TIP]
> This is the recommended way to use the SDK unless you have specific needs where it is necessary to split up the actions.

#### Parameters

In addition to the parameters listed in the `create` section below, `generate` introduces 3 new parameters:

- `waitForCompletion` (boolean, default true): Whether to wait for the project to complete.
- `downloadOutputs` (boolean, default true): Whether to download the generated files
- `downloadDirectory` (string, optional): Directory to save downloaded files (defaults to current directory)

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiClothesChanger.generate(
  {
    assets: {
      garmentFilePath: "/path/to/outfit.png",
      garmentType: "upper_body",
      personFilePath: "/path/to/model.png",
    },
    name: "Clothes Changer image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Clothes Changer <a name="create"></a>

Change outfits in photos in seconds with just a photo reference. Each photo costs 25 credits.

**API Endpoint**: `POST /v1/ai-clothes-changer`

#### Parameters

| Parameter            | Required | Description                                                                                                                                                                                                                                                                                                                                              | Example                                                                                                                     |
| -------------------- | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `assets`             |    ✓     | Provide the assets for clothes changer                                                                                                                                                                                                                                                                                                                   | `{"garmentFilePath": "api-assets/id/outfit.png", "garmentType": "upper_body", "personFilePath": "api-assets/id/model.png"}` |
| `└─ garmentFilePath` |    ✓     | The image of the outfit. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.   | `"api-assets/id/outfit.png"`                                                                                                |
| `└─ garmentType`     |    ✗     | Deprecated: garment_type is no longer needed.                                                                                                                                                                                                                                                                                                            | `"upper_body"`                                                                                                              |
| `└─ personFilePath`  |    ✓     | The image with the person. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/model.png"`                                                                                                 |
| `name`               |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                   | `"My Clothes Changer image"`                                                                                                |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiClothesChanger.create({
  assets: {
    garmentFilePath: "api-assets/id/outfit.png",
    garmentType: "upper_body",
    personFilePath: "api-assets/id/model.png",
  },
  name: "My Clothes Changer image",
});
```

#### Response

##### Type

[V1AiClothesChangerCreateResponse](/src/types/v1-ai-clothes-changer-create-response.ts)

##### Example

```typescript
{"creditsCharged": 25, "frameCost": 25, "id": "cuid-example"}
```
