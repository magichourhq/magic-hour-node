import path from "path";
import { transformEnumToUnion } from "./enum-to-union";
import { removeSpecificLines } from "./remove-headers";

console.log("Running codemod to transform enum to type union");
transformEnumToUnion(path.resolve("./src"));

console.log("Running codemod to remove extra header to fix API calls");
function shouldRemoveLine(line: string) {
  if (line.includes("x-sideko-sdk-language")) return true;
  if (line.includes("x-sideko-runtime")) return true;

  return false;
}

removeSpecificLines(
  path.resolve("./src/core/core-client.ts"),
  shouldRemoveLine,
);
