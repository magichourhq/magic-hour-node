import { Blob as NodeBlob } from "node-fetch";

export class BinaryResponse {
  content: Blob | NodeBlob;
  contentType: string | null;

  constructor(content: Blob | NodeBlob, contentType: string | null) {
    this.content = content;
    this.contentType = contentType;
  }
}
