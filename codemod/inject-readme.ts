import fs from "fs";
import path from "path";
import fg from "fast-glob";
import { Project, SyntaxKind } from "ts-morph";
import { extractCodeSnippet, transformExampleSnippet } from "./code-snippet";

function generateDocsForModule(
  moduleName: string,
  codeSnippet: string,
): string {
  return `
### ${moduleName} Generate Workflow <a name="generate"></a>

The workflow performs the following action

1. upload local assets to Magic Hour storage. So you can pass in a local path instead of having to upload files yourself
2. trigger a generation
3. poll for a completion status. This is configurable
4. if success, download the output to local directory

> [!TIP]
> This is the recommended way to use the SDK unless you have specific needs where it is necessary to split up the actions.

#### Parameters

In addition to the parameters listed in the \`create\` section below, \`generate\` introduces 3 new parameters:

- \`waitForCompletion\` (boolean, default true): Whether to wait for the project to complete.
- \`downloadOutputs\` (boolean, default true): Whether to download the generated files
- \`downloadDirectory\` (string, optional): Directory to save downloaded files (defaults to current directory)

#### Example Snippet

\`\`\`typescript
${codeSnippet}
\`\`\`
  `.trim();
}

function formatModuleName(moduleName: string): string {
  return moduleName
    .replace(/-/g, " ")
    .split(" ")
    .map((word) =>
      word === "ai" ? "AI" : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

async function main() {
  // Find all client READMEs
  const files = fg.sync("src/resources/v1/*/README.md", {
    dot: true,
    ignore: [
      "**/files/**",
      "**/image-projects/**",
      "**/video-projects/**",
      "**/face-detection/**",
    ],
  });

  for (const file of files) {
    const moduleName = formatModuleName(path.basename(path.dirname(file)));

    console.log(`📄 Processing ${moduleName}...`);

    let content = fs.readFileSync(file, "utf8");

    const example = extractCodeSnippet(content);

    if (!example) {
      throw new Error(`❌ No example found for ${moduleName}`);
    }

    const generateSnippet = await transformExampleSnippet(example);

    const docs = generateDocsForModule(moduleName, generateSnippet);

    const updated = content.replace(
      /(<!-- CUSTOM DOCS START -->)([\s\S]*?)(<!-- CUSTOM DOCS END -->)/,
      `$1\n${docs}\n\n$3`,
    );

    fs.writeFileSync(file, updated);
    console.log(`✅ Updated ${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
