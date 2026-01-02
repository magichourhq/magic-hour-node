# v1.ai-gif-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Gif Generator Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiGifGenerator.generate(
  {
    name: "Ai Gif gif",
    style: { prompt: "Cute dancing cat, pixel art" },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI GIF Generator <a name="create"></a>

Create an AI GIF. Each GIF costs 50 credits.

**API Endpoint**: `POST /v1/ai-gif-generator`

#### Parameters

| Parameter      | Required | Description                                                                        | Example                                     |
| -------------- | :------: | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| `style`        |    ✓     |                                                                                    | `{"prompt": "Cute dancing cat, pixel art"}` |
| `└─ prompt`    |    ✓     | The prompt used for the GIF.                                                       | `"Cute dancing cat, pixel art"`             |
| `name`         |    ✗     | The name of gif. This value is mainly used for your own identification of the gif. | `"Ai Gif gif"`                              |
| `outputFormat` |    ✗     | The output file format for the generated animation.                                | `"gif"`                                     |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiGifGenerator.create({
  name: "Ai Gif gif",
  outputFormat: "gif",
  style: { prompt: "Cute dancing cat, pixel art" },
});
```

#### Response

##### Type

[V1AiGifGeneratorCreateResponse](/src/types/v1-ai-gif-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 50, "frameCost": 50, "id": "cuid-example"}
```
