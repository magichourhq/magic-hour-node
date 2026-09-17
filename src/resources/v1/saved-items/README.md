# v1.saved-items

## Module Functions

### List saved items <a name="list"></a>

Returns active saved items owned by the authenticated account, newest first. Each item includes every saved asset with a durable file_path for reuse in compatible generation APIs and a temporary signed URL for previewing or downloading. Filter by type to find characters, references, voices, moodboards, or brand kits. To fetch the next page, pass the response's next_cursor as cursor.

**API Endpoint**: `GET /v1/saved-items`

#### Parameters

| Parameter | Required | Description                                                        | Example       |
| --------- | :------: | ------------------------------------------------------------------ | ------------- |
| `cursor`  |    ✗     | Opaque pagination cursor from the previous response's next_cursor. | `"string"`    |
| `limit`   |    ✗     | Maximum number of saved items to return. Defaults to 20.           | `20`          |
| `type`    |    ✗     | Only return saved items of this type.                              | `"character"` |

#### Example Snippet

```typescript
import { Client } from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });
const res = await client.v1.savedItems.list();
```

#### Response

##### Type

[V1SavedItemsListResponse](/src/types/v1-saved-items-list-response.ts)

##### Example

```typescript
{"items": [{"assets": [{"filePath": "saved-items/user-id/item-id/image.png", "isPrimary": true, "mediaKind": "IMAGE", "url": "http://www.example.com", "urlExpiresAt": "2026-09-17T00:00:00.000Z"}], "id": "cuid-example", "name": "Alex", "type": "character"}], "nextCursor": "string"}
```
