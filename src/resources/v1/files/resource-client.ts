import {
  CoreClient,
  CoreResourceClient,
  ResourceClientOptions,
} from "magic-hour/core";
import { UploadUrlsClient } from "magic-hour/resources/v1/files/upload-urls";

export class FilesClient extends CoreResourceClient {
  private _uploadUrlsLazy?: UploadUrlsClient; // lazy-loading cache

  constructor(coreClient: CoreClient, opts: ResourceClientOptions) {
    super(coreClient, opts);
    if (this._opts.lazyLoad === false) {
      this.uploadUrls;
    }
  }

  get uploadUrls(): UploadUrlsClient {
    return (
      this._uploadUrlsLazy ??
      (this._uploadUrlsLazy = new (require("./upload-urls").UploadUrlsClient)(
        this._client,
        this._opts,
      ))
    );
  }
}
