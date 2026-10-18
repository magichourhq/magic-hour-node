import { types } from "magic-hour";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
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
      const response = await fetch(download.url);
      if (!response.ok) {
        throw new Error(
          `Failed to download from ${download.url}: ${response.statusText}`,
        );
      }

      const buffer = await response.arrayBuffer();

      // Extract filename from URL or generate one
      const urlPath = new URL(download.url).pathname;
      const filename = path.basename(urlPath) || `download_${Date.now()}`;
      const filePath = path.join(baseDir, filename);

      fs.writeFileSync(filePath, Buffer.from(buffer));
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
