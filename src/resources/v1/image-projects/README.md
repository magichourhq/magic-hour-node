
### get <a name="get"></a>
Get image project details

Get the details of a image project. The `download` field will be `null` unless the image was successfully rendered.

The image can be one of the following status
- `draft` - not currently used
- `queued` - the job is queued and waiting for a GPU
- `rendering` - the generation is in progress
- `complete` - the image is successful created
- `error` - an error occurred during rendering
- `canceled` - image render is canceled by the user


**API Endpoint**: `GET /v1/image-projects/{id}`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.imageProjects.get({ id: "string" });
```

**Upgrade to see all examples**
