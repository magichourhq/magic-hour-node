import { Project, PropertyAssignment, SyntaxKind } from "ts-morph";
import prettier from "prettier";
export function extractCodeSnippet(markdownContent: string): string | null {
  // Find the first TypeScript code block
  const codeBlockRegex = /```typescript\s*\n([\s\S]*?)```/g;
  const match = codeBlockRegex.exec(markdownContent);

  if (!match || !match[1]) {
    return null;
  }

  return match[1].trim();
}

export async function transformExampleSnippet(code: string): Promise<string> {
  const exampleProject = new Project();
  const sourceFile = exampleProject.createSourceFile("temp.ts", code, {
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
