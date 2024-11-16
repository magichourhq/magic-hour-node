import * as fs from "fs";

/**
 * Removes specific lines from a file.
 * @param filePath The path to the file.
 * @param shouldRemoveLine An array of exact lines to remove.
 */
export function removeSpecificLines(
  filePath: string,
  shouldRemoveLine: (line: string) => boolean
): void {
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const cleanedLines = fileContents
    .split("\n")
    .filter((line) => shouldRemoveLine(line));

  fs.writeFileSync(filePath, cleanedLines.join("\n"), "utf-8");
}
