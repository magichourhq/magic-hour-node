# v1.ai-headshot-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Headshot Generator Generate Workflow <a name="generate"></a>

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
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiHeadshotGenerator.generate(
  {
    assets: { imageFilePath: "/path/to/1234.png" },
    name: "Ai Headshot image",
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: ".",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Headshot Generator <a name="create"></a>

Create an AI headshot. Each headshot costs 50 credits.

**API Endpoint**: `POST /v1/ai-headshot-generator`

#### Parameters

| Parameter          | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                         | Example                                       |
| ------------------ | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `assets`           |    ✓     | Provide the assets for headshot photo                                                                                                                                                                                                                                                                                                                                                                               | `{"imageFilePath": "api-assets/id/1234.png"}` |
| `└─ imageFilePath` |    ✓     | The image used to generate the headshot. This image must contain one detectable face. This value is either - a direct URL to the video file - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls). See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details. | `"api-assets/id/1234.png"`                    |
| `name`             |    ✗     | Give your image a custom name for easy identification.                                                                                                                                                                                                                                                                                                                                                              | `"My Ai Headshot image"`                      |
| `style`            |    ✗     |                                                                                                                                                                                                                                                                                                                                                                                                                     | `{}`                                          |
| `└─ prompt`        |    ✗     | Prompt used to guide the style of your headshot. We recommend omitting the prompt unless you want to customize your headshot. You can visit [AI headshot generator](https://magichour.ai/create/ai-headshot-generator) to view an example of a good prompt used for our 'Professional' style.                                                                                                                       | `"string"`                                    |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiHeadshotGenerator.create({
  assets: { imageFilePath: "api-assets/id/1234.png" },
  name: "My Ai Headshot image",
});
```

#### Response

##### Type

[V1AiHeadshotGeneratorCreateResponse](/src/types/v1-ai-headshot-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}
```
