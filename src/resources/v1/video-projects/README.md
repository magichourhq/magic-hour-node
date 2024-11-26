
### get <a name="get"></a>
Get video project details

Get the details of a video project. The `download` field will be `null` unless the video was successfully rendered.

The video can be one of the following status
- `draft` - not currently used
- `queued` - the job is queued and waiting for a GPU
- `rendering` - the generation is in progress
- `complete` - the video is successful created
- `error` - an error occurred during rendering
- `canceled` - video render is canceled by the user


**API Endpoint**: `GET /v1/video-projects/{id}`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.videoProjects.get({ id: "string" });
```

**Upgrade to see all examples**
