import { CoreClient, CoreResourceClient } from "magic-hour/core";
import { UploadUrlsClient } from "magic-hour/resources/v1/files/upload-urls";

export class FilesClient extends CoreResourceClient {
  uploadUrls: UploadUrlsClient;

  constructor(client: CoreClient) {
    super(client);

    this.uploadUrls = new UploadUrlsClient(this._client);
  }
}
