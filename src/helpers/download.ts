import { types } from "magic-hour";
import * as fs from "fs";
import * as path from "path";
import { getLogger } from "magic-hour/logger";
import { DownloadError } from "magic-hour/helpers/download-error";

/**
 * Download files from the given download URLs
 */
export async function downloadFiles(
  downloads: (
    | types.V1ImageProjectsGetResponseDownloadsItem
    | types.V1VideoProjectsGetResponseDownloadsItem
  )[],
  downloadDirectory?: string,
): Promise<string[]> {
  const downloadedPaths: string[] = [];
  const downloadErrors: DownloadError["downloadErrors"] = [];

  // Use current working directory if no download directory specified
  const baseDir = downloadDirectory || process.cwd();

  // Ensure the download directory exists
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
  } catch (error) {
    throw new DownloadError(
      [],
      [
        {
          stage: "directory",
          message: error instanceof Error ? error.message : String(error),
        },
      ],
    );
  }

  getLogger().debug(`Downloading outputs to ${baseDir}`);

  for (const download of downloads) {
    getLogger().debug(`Downloading output from ${download.url}`);
    try {
      // Native fetch rejects truncated Content-Length bodies. node-fetch 2 can
      // leave arrayBuffer() pending after the underlying socket is aborted.
      const response = await fetch(download.url);
      if (!response.ok) {
        await response.body?.cancel();
        throw new Error(
          `Failed to download from ${download.url}: ${response.statusText}`,
        );
      }

      const buffer = await response.arrayBuffer();

      // Extract filename from URL or generate one
      const urlPath = new URL(download.url).pathname;
      const filename = path.basename(urlPath) || `download_${Date.now()}`;
      const { name, ext } = path.parse(filename);
      let filePath = path.join(baseDir, filename);
      let suffix = 1;
      let descriptor: number;
      while (true) {
        try {
          // Exclusive creation preserves earlier outputs and user files, even
          // when concurrent downloads choose the same destination name.
          descriptor = fs.openSync(filePath, "wx");
          break;
        } catch (error) {
          if (
            typeof error !== "object" ||
            error === null ||
            !("code" in error) ||
            error.code !== "EEXIST"
          ) {
            throw error;
          }
          filePath = path.join(baseDir, `${name}_${suffix++}${ext}`);
        }
      }
      try {
        fs.writeFileSync(descriptor, Buffer.from(buffer));
      } catch (error) {
        try {
          // Only remove the file this attempt created. A different file may
          // have replaced its path while the write failed.
          const openedFile = fs.fstatSync(descriptor);
          const currentFile = fs.lstatSync(filePath);
          if (
            openedFile.dev === currentFile.dev &&
            openedFile.ino === currentFile.ino
          ) {
            fs.unlinkSync(filePath);
          }
        } catch {
          // Keep the original write error if cleanup also fails.
        }
        throw error;
      } finally {
        fs.closeSync(descriptor);
      }
      getLogger().debug(`Downloaded output to ${filePath}`);
      downloadedPaths.push(filePath);
    } catch (error) {
      downloadErrors.push({
        stage: "file",
        url: download.url,
        message: error instanceof Error ? error.message : String(error),
      });
      getLogger().error(
        `Error downloading file from ${download.url}: ${error}`,
      );
    }
  }

  if (downloadErrors.length > 0) {
    throw new DownloadError(downloadedPaths, downloadErrors);
  }

  return downloadedPaths;
}
