import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

/**
 * Transforms enums into string unions using the TypeScript Compiler API.
 */
function enumToUnion(fileName: string, sourceCode: string): string {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const transformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
    const visit: ts.Visitor = (node) => {
      // Check if the node is an enum declaration
      if (ts.isEnumDeclaration(node)) {
        const enumName = node.name.text;

        // Extract enum members as string literals
        const unionTypes: ts.LiteralTypeNode[] = node.members.map((member) => {
          const memberName = member.name;
          const value =
            member.initializer && ts.isStringLiteral(member.initializer)
              ? member.initializer.text
              : ts.isIdentifier(memberName)
              ? memberName.text
              : (memberName as ts.StringLiteral).text;
          return ts.factory.createLiteralTypeNode(
            ts.factory.createStringLiteral(value)
          );
        });

        // Replace enum with a type alias (string union)
        return ts.factory.createTypeAliasDeclaration(
          undefined,
          [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          enumName,
          undefined,
          ts.factory.createUnionTypeNode(unionTypes)
        );
      }

      return ts.visitEachChild(node, visit, context);
    };

    return (node) => ts.visitNode(node, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  const transformedSourceFile = result.transformed[0];
  const transformedCode = printer.printFile(
    transformedSourceFile as ts.SourceFile
  );

  result.dispose();

  return transformedCode;
}

/**
 * Recursively loops through a directory to find files with "enum" in their name.
 */
export function transformEnumToUnion(directory: string): void {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);

    if (fs.statSync(fullPath).isDirectory()) {
      transformEnumToUnion(fullPath);
    } else if (file.includes("enum") && file.endsWith(".ts")) {
      console.log(`processing: ${fullPath}`);
      const sourceCode = fs.readFileSync(fullPath, "utf-8");
      const transformedCode = enumToUnion(fullPath, sourceCode);

      // Write the transformed code back to the file
      fs.writeFileSync(fullPath, transformedCode, "utf-8");
    }
  }
}

const targetDirectory = path.resolve("./src");
transformEnumToUnion(targetDirectory);
