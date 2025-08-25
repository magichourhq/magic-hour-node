import * as fs from "fs";
import * as path from "path";
import { Project, PropertyAssignment, SyntaxKind } from "ts-morph";
import prettier from "prettier";
/**
 * Script to inject examples into README files by transforming the existing examples
 * with .generate method and proper file paths
 */

interface TransformOptions {
  waitForDownload?: boolean;
  outputDir?: string;
}

function extractCodeSnippet(markdownContent: string): string | null {
  // Find the first TypeScript code block
  const codeBlockRegex = /```typescript\s*\n([\s\S]*?)```/g;
  const match = codeBlockRegex.exec(markdownContent);

  if (!match || !match[1]) {
    return null;
  }

  return match[1].trim();
}

async function transformExampleSnippet(
  code: string,
  options: TransformOptions = {},
) {
  const project = new Project();
  const sourceFile = project.createSourceFile("temp.ts", code, {
    overwrite: true,
  });

  const createCall = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((c) => c.getExpression().getText().endsWith(".create"));

  if (!createCall) {
    console.log("No create call found");
    return code;
  }

  // Change .create -> .generate
  const expr = createCall.getExpression();
  expr.replaceWithText(expr.getText().replace(/\.create$/, ".generate"));

  // Add 2nd argument
  createCall.addArgument(`{
    waitForCompletion: true,
    downloadOutputs: true,
    downloadDirectory: 'outputs'
  }`);

  // Update asset paths
  const firstArg = createCall.getArguments()[0];
  if (firstArg && firstArg.asKind(SyntaxKind.ObjectLiteralExpression)) {
    const obj = firstArg.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

    const assetsProp = obj.getProperty("assets");
    if (assetsProp && assetsProp.asKind(SyntaxKind.PropertyAssignment)) {
      const initializer = (
        assetsProp as PropertyAssignment
      ).getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (initializer) {
        // Narrow to PropertyAssignment before calling getInitializer
        const assetProps = initializer
          .getProperties()
          .filter((p) =>
            p.asKind(SyntaxKind.PropertyAssignment),
          ) as PropertyAssignment[];

        assetProps.forEach((prop) => {
          const val = prop.getInitializerIfKind(SyntaxKind.StringLiteral);
          if (val) {
            val.setLiteralValue(
              val.getLiteralValue().replace("api-assets/id", "/path/to"),
            );
          }
        });
      }
    }
  }

  const prettierConfig = (await prettier.resolveConfig(".")) || {};
  const formatted = prettier.format(sourceFile.getFullText(), {
    ...prettierConfig,
    parser: "typescript",
  });

  return formatted;
}

async function processReadmeFile(
  readmePath: string,
  options: TransformOptions = {},
) {
  try {
    const content = fs.readFileSync(readmePath, "utf-8");
    const codeSnippet = extractCodeSnippet(content);

    if (!codeSnippet) {
      console.log(`No TypeScript code snippet found in ${readmePath}`);
      return;
    }

    const transformedSnippet = await transformExampleSnippet(
      codeSnippet,
      options,
    );

    console.log(
      `=== Original snippet from ${path.basename(
        path.dirname(readmePath),
      )} ===`,
    );
    console.log(codeSnippet);
    console.log("\n=== Transformed snippet ===");
    console.log(transformedSnippet);
    console.log("\n" + "=".repeat(50) + "\n");
  } catch (error) {
    console.error(`Error processing ${readmePath}:`, error);
  }
}

function findAllReadmeFiles(baseDir: string): string[] {
  const readmeFiles: string[] = [];

  function scanDirectory(dir: string): void {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip common non-resource directories
        if (!["node_modules", ".git", "dist", "build"].includes(item)) {
          scanDirectory(fullPath);
        }
      } else if (item === "README.md") {
        readmeFiles.push(fullPath);
      }
    }
  }

  scanDirectory(baseDir);
  return readmeFiles;
}

// Main execution
async function main() {
  const baseDir = path.join(__dirname, "..", "src", "resources");
  const options: TransformOptions = {
    waitForDownload: true,
    outputDir: path.join(__dirname, "..", "generated-examples"),
  };

  console.log("🔍 Finding README files in resources directory...\n");

  const readmeFiles = findAllReadmeFiles(baseDir);

  if (readmeFiles.length === 0) {
    console.log("No README.md files found in resources directory");
    return;
  }

  console.log(`Found ${readmeFiles.length} README files:\n`);

  readmeFiles.forEach((readmePath, index) => {
    const relativePath = path.relative(baseDir, readmePath);
    console.log(`${index + 1}. ${relativePath}`);
  });

  console.log("\n🔄 Processing examples...\n");

  await Promise.all(
    readmeFiles.map((readmePath) => processReadmeFile(readmePath, options)),
  );

  console.log("✅ Processing complete!");
}

// Export functions for potential reuse
export {
  extractCodeSnippet,
  transformExampleSnippet,
  processReadmeFile,
  findAllReadmeFiles,
  type TransformOptions,
};

// Run if called directly
if (require.main === module) {
  main();
}
