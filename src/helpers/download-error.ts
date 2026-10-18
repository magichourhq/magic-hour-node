/**
 * A local download failure after a project has completed remotely.
 */
export class DownloadError extends Error {
  constructor(
    public readonly downloadedPaths: string[],
    public readonly downloadErrors: {
      stage: "directory" | "file";
      message: string;
      url?: string;
    }[],
  ) {
    super(
      "Generated outputs could not all be downloaded. Retry the download URLs without generating again.",
    );
    this.name = "DownloadError";
  }
}
