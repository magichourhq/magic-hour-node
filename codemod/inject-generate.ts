// scripts/add-generate-methods.ts
import { Project, Node, PropertyAssignment, SyntaxKind } from "ts-morph";
import fg from "fast-glob";
import prettier from "prettier";
import fs from "fs";
import * as path from "path";
import { extractCodeSnippet, transformExampleSnippet } from "./code-snippet";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

// Function to extract JSDoc comments from asset types
function extractAssetFieldComments(
  assetsTypeName: string,
): Record<string, string> {
  const assetProps: Record<string, string> = {};

  try {
    const typeFiles = project
      .getSourceFiles()
      .filter(
        (file) =>
          file.getFilePath().includes("types") &&
          file.getTypeAlias(assetsTypeName),
      );

    const typeAlias = typeFiles[0]?.getTypeAlias(assetsTypeName);
    if (typeAlias) {
      const typeNode = typeAlias.getTypeNode();
      if (typeNode && Node.isTypeLiteral(typeNode)) {
        for (const member of typeNode.getMembers()) {
          if (Node.isPropertySignature(member)) {
            const name = member.getName();
            const jsDocs = member.getJsDocs();
            if (jsDocs.length > 0) {
              const comment = jsDocs
                .map((d) => d.getInnerText().trim())
                .join("\n");
              const parts = comment.split(".");
              const firstSentence = parts[0]?.trim();

              if (name.endsWith("FilePath")) {
                assetProps[name] = `
* ${firstSentence ? firstSentence + "." : comment} This value is either
* - a direct URL to the image file
* - a path to a local file
*
* Note: if the path begins with \`api-assets\`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.
`;
              } else {
                assetProps[name] = firstSentence
                  ? firstSentence + "."
                  : comment;
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Could not extract comments for ${assetsTypeName}:`, error);
  }

  return assetProps;
}

function pascalCase(str: string) {
  return str.replace(/(^|[-_])(.)/g, (_, __, c) => c.toUpperCase());
}

function generateAssetsHandling(
  isAssetsOptional: boolean,
  filePathKeys: string[],
  optionalFilePathKeys: string[],
  classDecl: any,
) {
  if (!filePathKeys.length) {
    return `
const createResponse = await this.create(request, createOpts);`;
  }

  const debugLogs = filePathKeys
    .map((key) => {
      const isOptional = optionalFilePathKeys.includes(key);
      return isOptional
        ? `if (${key}) {
      getLogger().debug(\`Uploading file \${${key}} to Magic Hour's storage\`);
    }`
        : `getLogger().debug(\`Uploading file \${${key}} to Magic Hour's storage\`);`;
    })
    .join("\n  ");

  const uploadPromises = filePathKeys
    .map((key) => {
      const isOptional = optionalFilePathKeys.includes(key);
      return isOptional
        ? `${key} ? fileClient.uploadFile(${key}) : Promise.resolve(${key})`
        : `fileClient.uploadFile(${key})`;
    })
    .join(",\n    ");

  const infoLogs = filePathKeys
    .map((key) => {
      const isOptional = optionalFilePathKeys.includes(key);
      return isOptional
        ? `if (${key}) {
      getLogger().info(\`Uploaded file \${${key}} to Magic Hour's storage as \${uploaded${pascalCase(
            key,
          )}}\`);
    }`
        : `getLogger().info(\`Uploaded file \${${key}} to Magic Hour's storage as \${uploaded${pascalCase(
            key,
          )}}\`);`;
    })
    .join("\n  ");

  const uploadedVars = filePathKeys
    .map((k) => "uploaded" + pascalCase(k))
    .join(", ");

  const assetsMapping = filePathKeys
    .map((key) => {
      const isOptional = optionalFilePathKeys.includes(key);
      return isOptional
        ? `${key}: ${key} ? uploaded${pascalCase(key)} : ${key}`
        : `${key}: uploaded${pascalCase(key)}`;
    })
    .join(",\n      ");

  if (isAssetsOptional) {
    return `
if (request.assets) {
  const fileClient = new FilesClient(this._client, this._opts);
  const { ${filePathKeys.join(", ")}, ...restAssets } = request.assets || {};

  ${debugLogs}

  const [${uploadedVars}] = await Promise.all([
    ${uploadPromises}
  ]);

  ${infoLogs}

  const processedAssets = {
    ...restAssets,
    ${assetsMapping}
  };

  const createRequest = {
    ...request,
    assets: processedAssets
  };

  const createResponse = await this.create(createRequest, createOpts);
}`;
  } else {
    return `
const fileClient = new FilesClient(this._client, this._opts);
const { ${filePathKeys.join(", ")}, ...restAssets } = request.assets;

${debugLogs}

const [${uploadedVars}] = await Promise.all([
  ${uploadPromises}
]);

${infoLogs}

const createResponse = await this.create(
  {
    ...request,
    assets: {
      ...restAssets,
      ${assetsMapping}
    }
  },
  createOpts,
);`;
  }
}

function isVideoClient(filePath: string): boolean {
  // Video clients based on directory names
  const videoClients = [
    "animation",
    "ai-talking-photo",
    "auto-subtitle-generator",
    "face-swap",
    "image-to-video",
    "lip-sync",
    "text-to-video",
    "video-to-video",
  ];

  // Check if any video client name is in the file path
  return videoClients.some((client) => filePath.includes(`/${client}/`));
}

// Example extraction and transformation functions
interface TransformOptions {
  waitForDownload?: boolean;
  outputDir?: string;
}

async function extractAndTransformExample(
  readmePath: string,
): Promise<string | null> {
  try {
    const content = fs.readFileSync(readmePath, "utf-8");
    const codeSnippet = extractCodeSnippet(content);

    if (!codeSnippet) {
      return null;
    }

    const transformedSnippet = await transformExampleSnippet(codeSnippet);
    return transformedSnippet;
  } catch (error) {
    console.warn(`Error processing ${readmePath}:`, error);
    return null;
  }
}

async function main() {
  const files = await fg("src/resources/**/resource-client.ts", {
    ignore: [
      "**/face-detection/**",
      "**/files/**",
      "**/image-projects/**",
      "**/video-projects/**",
    ],
  });

  for (const filePath of files) {
    const source = project.addSourceFileAtPath(filePath);
    console.log(`Processing ${filePath}`);

    // Extract example from corresponding README
    const readmePath = path.join(path.dirname(filePath), "README.md");
    const exampleCode = await extractAndTransformExample(readmePath);

    // --- Ensure imports ---
    const isVideo = isVideoClient(filePath);

    // Remove existing projects client imports to avoid conflicts
    const existingImageProjectsImport = source.getImportDeclaration(
      (d) =>
        d.getModuleSpecifierValue() ===
        "magic-hour/resources/v1/image-projects",
    );
    if (existingImageProjectsImport) {
      existingImageProjectsImport.remove();
    }

    const existingVideoProjectsImport = source.getImportDeclaration(
      (d) =>
        d.getModuleSpecifierValue() ===
        "magic-hour/resources/v1/video-projects",
    );
    if (existingVideoProjectsImport) {
      existingVideoProjectsImport.remove();
    }

    const projectsClientImport = isVideo
      ? {
          moduleSpecifier: "magic-hour/resources/v1/video-projects",
          namedImports: ["VideoProjectsClient"],
        }
      : {
          moduleSpecifier: "magic-hour/resources/v1/image-projects",
          namedImports: ["ImageProjectsClient"],
        };

    const importsToAdd = [
      {
        moduleSpecifier: "magic-hour/resources/v1/files",
        namedImports: ["FilesClient"],
      },
      {
        moduleSpecifier: "magic-hour/logger",
        namedImports: ["getLogger"],
      },
      projectsClientImport,
      {
        moduleSpecifier: "magic-hour/helpers/generate-type",
        namedImports: ["GenerateOptions", "GenerateRequestType"],
      },
    ];
    for (const imp of importsToAdd) {
      if (
        !source.getImportDeclaration(
          (d) => d.getModuleSpecifierValue() === imp.moduleSpecifier,
        )
      ) {
        source.addImportDeclaration(imp);
      }
    }

    // --- Find the client class and constructor ---
    const classDecl = source.getClasses()[0];
    if (!classDecl) {
      console.warn(`⚠️ No class found in ${filePath}`);
      continue;
    }

    const ctor = classDecl.getConstructors()[0];
    if (!ctor) {
      console.warn(`⚠️ No constructor found in ${filePath}`);
      continue;
    }

    // --- Find the request type from the `create` method ---
    const createMethod = classDecl
      .getInstanceMethods()
      .find((m) => m.getName() === "create");
    if (!createMethod) {
      console.warn(`⚠️ No create() method found in ${filePath}`);
      continue;
    }

    const reqParam = createMethod
      .getParameters()
      .find((p) => p.getName() === "request");
    if (!reqParam) {
      console.warn(`⚠️ No request param found in create() of ${filePath}`);
      continue;
    }

    const reqType = reqParam.getType();
    const reqTypeText = reqParam.getTypeNode()?.getText() ?? reqType.getText();

    const assetsProp = reqType.getProperty("assets");
    let filePathKeys: string[] = [];
    let assetComments: Record<string, string> = {};
    let isAssetsOptional = false;

    if (assetsProp) {
      // Check if assets property is optional
      const assetsProperty = reqType
        .getProperties()
        .find((p) => p.getName() === "assets");
      isAssetsOptional =
        assetsProperty
          ?.getDeclarations()
          ?.some(
            (decl) =>
              decl.getText().includes("assets?") ||
              decl.getText().includes("assets?:"),
          ) ?? false;

      const assetsType = assetsProp.getTypeAtLocation(source);

      // Get file path keys with their optional status
      const filePathProps = assetsType
        .getProperties()
        .filter((p) => p.getName().endsWith("FilePath"));

      filePathKeys = filePathProps.map((p) => p.getName());

      // Check which file path properties are optional
      const optionalFilePathKeys: string[] = [];
      for (const prop of filePathProps) {
        const isOptional =
          prop
            .getDeclarations()
            ?.some(
              (decl) =>
                decl.getText().includes("?") || decl.getText().includes("?:"),
            ) ?? false;

        if (isOptional) {
          optionalFilePathKeys.push(prop.getName());
        }
      }

      const assetsTypeText = assetsType.getText();
      const assetsTypeMatch = assetsTypeText.match(/(\w+Assets)/);
      if (assetsTypeMatch && assetsTypeMatch[1]) {
        const assetsTypeName = assetsTypeMatch[1];
        assetComments = extractAssetFieldComments(assetsTypeName);
        console.log(`Extracted comments for ${assetsTypeName}:`, assetComments);
      }

      // Store optional file path keys for later use
      (globalThis as any).optionalFilePathKeys = optionalFilePathKeys;
    }

    // --- Insert or update GenerateRequest type alias after last import ---
    let genType = source.getTypeAlias("GenerateRequest");

    // Extract the original property signatures for file path keys
    const fields = filePathKeys.length
      ? (() => {
          const originalFields: string[] = [];

          if (assetsProp) {
            const assetsType = assetsProp.getTypeAtLocation(source);
            const assetsTypeText = assetsType.getText();
            const assetsTypeMatch = assetsTypeText.match(/(\w+Assets)/);

            if (assetsTypeMatch && assetsTypeMatch[1]) {
              const assetsTypeName = assetsTypeMatch[1];
              const assetsTypeAlias = project
                .getSourceFiles()
                .filter((file) => file.getFilePath().includes("types"))
                .map((file) => file.getTypeAlias(assetsTypeName))
                .find(Boolean);

              if (assetsTypeAlias) {
                const typeNode = assetsTypeAlias.getTypeNode();
                if (typeNode && Node.isTypeLiteral(typeNode)) {
                  for (const member of typeNode.getMembers()) {
                    if (Node.isPropertySignature(member)) {
                      const name = member.getName();
                      if (filePathKeys.includes(name)) {
                        const comment = assetComments[name] || "File input";
                        const typeText =
                          member.getTypeNode()?.getText() || "string";
                        const questionToken = member.getQuestionTokenNode();
                        const optionalMark = questionToken ? "?" : "";
                        originalFields.push(
                          `/** ${comment} */\n    ${name}${optionalMark}: ${typeText};`,
                        );
                      }
                    }
                  }
                }
              } else {
                // Fallback: if we can't find the type alias, use the original approach
                filePathKeys.forEach((k) => {
                  const comment = assetComments[k] || "File input";
                  originalFields.push(`/** ${comment} */\n    ${k}: string;`);
                });
              }
            } else {
              // Fallback: if we can't match the assets type, use the original approach
              filePathKeys.forEach((k) => {
                const comment = assetComments[k] || "File input";
                originalFields.push(`/** ${comment} */\n    ${k}: string;`);
              });
            }
          } else {
            // Fallback: if we can't access assets type, use the original approach
            filePathKeys.forEach((k) => {
              const comment = assetComments[k] || "File input";
              originalFields.push(`/** ${comment} */\n    ${k}: string;`);
            });
          }

          return originalFields;
        })().join("\n    ")
      : "";

    const typeText = `GenerateRequestType<${reqTypeText}, {${
      fields ? "\n    " + fields + "\n  " : ""
    }}>`;
    if (!genType) {
      const lastImport = source.getImportDeclarations().pop();
      const insertPos = lastImport ? lastImport.getChildIndex() + 1 : 0;
      source.insertTypeAlias(insertPos, {
        name: "GenerateRequest",
        type: typeText,
      });
    } else {
      genType.setType(typeText);
    }

    // --- Insert or update generate() method below constructor ---
    let genMethod = classDecl.getMethod("generate");

    // Generate the final assets handling code using the helper function
    const assetsHandling = generateAssetsHandling(
      isAssetsOptional,
      filePathKeys,
      (globalThis as any).optionalFilePathKeys || [],
      classDecl,
    );

    const methodBody = `
const {
  waitForCompletion = true,
  downloadOutputs = true,
  downloadDirectory = undefined,
  ...createOpts
} = opts;

${assetsHandling}

getLogger().info(\`Created ${classDecl.getName()} project \$\{createResponse.id\}\`);

const projectsClient = ${
      isVideo
        ? "new VideoProjectsClient(this._client, this._opts)"
        : "new ImageProjectsClient(this._client, this._opts)"
    };

getLogger().debug(\`Checking result for ${classDecl.getName()} project \$\{createResponse.id\}\`);

const result = await projectsClient.checkResult(
  { id: createResponse.id },
  {
    waitForCompletion,
    downloadOutputs,
    downloadDirectory,
    ...createOpts,
  },
);

return result;
`;

    const createJsDocs = createMethod.getJsDocs();

    const createDocText =
      createJsDocs.length > 0
        ? createJsDocs.map((d) => d.getInnerText().trim()).join("\n")
        : "AI generate helper with automatic polling and downloading.\n";

    let description = `${createDocText.split(".")[0]?.trim()}

This method provides a convenient way to create a request and automatically wait for completion and download outputs.`;

    // Add example code if available
    if (exampleCode) {
      description += `

@example
\`\`\`typescript
${exampleCode.trim()}
\`\`\``;
    }

    const docs = [
      {
        description,
      },
    ];

    if (!genMethod) {
      classDecl.insertMethod(ctor.getChildIndex() + 1, {
        isAsync: true,
        name: "generate",
        parameters: [
          { name: "request", type: "GenerateRequest" },
          { name: "opts", type: "GenerateOptions = {}" },
        ],
        statements: methodBody,
        docs: docs,
      });
    } else {
      genMethod.setBodyText(methodBody);
      genMethod.getJsDocs().forEach((d) => d.remove());
      genMethod.addJsDocs(docs);
    }

    // --- Format with Prettier ---
    const prettierConfig = (await prettier.resolveConfig(filePath)) || {};
    const formatted = prettier.format(source.getFullText(), {
      ...prettierConfig,
      parser: "typescript",
    });
    fs.writeFileSync(filePath, formatted, "utf8");

    console.log(`✅ Updated and formatted ${filePath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
