import {types} from "magic-hour";
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

/**
 * Download files from the given download URLs
 */
export async function downloadFiles(
  downloads: (
    | types.V1ImageProjectsGetResponseDownloadsItem
    | types.V1VideoProjectsGetResponseDownloadsItem
  )[],
  downloadDirectory?: string
): Promise<string[]> {
  const downloadedPaths: string[] = [];

  // Use current working directory if no download directory specified
  const baseDir = downloadDirectory || process.cwd();

  // Ensure the download directory exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, {recursive: true});
  }

  for (const download of downloads) {
    try {
      const response = await fetch(download.url);
      if (!response.ok) {
        throw new Error(`Failed to download from ${download.url}: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();

      // Extract filename from URL or generate one
      const urlPath = new URL(download.url).pathname;
      const filename = path.basename(urlPath) || `download_${Date.now()}`;
      const filePath = path.join(baseDir, filename);

      fs.writeFileSync(filePath, Buffer.from(buffer));
      downloadedPaths.push(filePath);
    } catch (error) {
      console.error(`Error downloading file from ${download.url}:`, error);
    }
  }

  return downloadedPaths;
}
