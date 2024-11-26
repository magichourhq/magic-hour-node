
### create <a name="create"></a>
Create Face Swap Photo

Create a face swap photo. Each photo costs 5 frames. The height/width of the output image depends on your subscription. Please refer to our [pricing](/pricing) page for more details

**API Endpoint**: `POST /v1/face-swap-photo`

#### Example Snippet

```typescript
import Client from "magic-hour";

const client = new Client({ token: process.env["API_TOKEN"]!! });

const res = await client.v1.faceSwapPhoto.create({
  data: {
    assets: {
      source_file_path: "image/id/1234.png",
      target_file_path: "image/id/1234.png",
    },
    name: "Face Swap image",
  },
});
```

**Upgrade to see all examples**
