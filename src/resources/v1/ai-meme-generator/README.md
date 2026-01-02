# v1.ai-meme-generator

## Module Functions

<!-- CUSTOM DOCS START -->

### AI Meme Generator Generate Workflow <a name="generate"></a>

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
const res = await client.v1.aiMemeGenerator.generate(
  {
    name: "My Funny Meme",
    style: {
      searchWeb: false,
      template: "Drake Hotline Bling",
      topic: "When the code finally works",
    },
  },
  {
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: "outputs",
  },
);
```

<!-- CUSTOM DOCS END -->

### AI Meme Generator <a name="create"></a>

Create an AI generated meme. Each meme costs 10 credits.

**API Endpoint**: `POST /v1/ai-meme-generator`

#### Parameters

| Parameter      | Required | Description                                           | Example                                                                                           |
| -------------- | :------: | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `style`        |    ✓     |                                                       | `{"searchWeb": false, "template": "Drake Hotline Bling", "topic": "When the code finally works"}` |
| `└─ searchWeb` |    ✗     | Whether to search the web for meme content.           | `false`                                                                                           |
| `└─ template`  |    ✓     | To use our templates, pass in one of the enum values. | `"Drake Hotline Bling"`                                                                           |
| `└─ topic`     |    ✓     | The topic of the meme.                                | `"When the code finally works"`                                                                   |
| `name`         |    ✗     | The name of the meme.                                 | `"My Funny Meme"`                                                                                 |

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.aiMemeGenerator.create({
  name: "My Funny Meme",
  style: {
    searchWeb: false,
    template: "Drake Hotline Bling",
    topic: "When the code finally works",
  },
});
```

#### Response

##### Type

[V1AiMemeGeneratorCreateResponse](/src/types/v1-ai-meme-generator-create-response.ts)

##### Example

```typescript
{"creditsCharged": 10, "frameCost": 10, "id": "cuid-example"}
```
