// scripts/add-generate-methods.ts
import { Project, Node } from "ts-morph";
import fg from "fast-glob";
import prettier from "prettier";
import fs from "fs";
import * as path from "path";

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
                assetProps[name] = `${
                  firstSentence ? firstSentence + "." : comment
                } This value is either
     * - a direct URL to the image file
     * - a path to a local file
     *
     * Note: if the path begins with \`api-assets\`, it will be assumed to already be uploaded to Magic Hour's storage, and will not be uploaded again.`;
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

async function main() {
  const files = await fg("src/resources/**/resource-client.ts");

  for (const filePath of files) {
    const source = project.addSourceFileAtPath(filePath);
    console.log(`Processing ${filePath}`);

    // --- Ensure imports ---
    const importsToAdd = [
      {
        moduleSpecifier: "magic-hour/resources/v1/files",
        namedImports: ["FilesClient"],
      },
      {
        moduleSpecifier: "magic-hour/resources/v1/image-projects",
        namedImports: ["ImageProjectsClient"],
      },
      {
        moduleSpecifier: "magic-hour/helpers/generate-type",
        namedImports: ["GenerateOptions", "GenerateRequestType"],
      },
      {
        moduleSpecifier: "magic-hour/helpers/download",
        namedImports: ["downloadFiles"],
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

    if (assetsProp) {
      const assetsType = assetsProp.getTypeAtLocation(source);
      filePathKeys = assetsType
        .getProperties()
        .map((p) => p.getName())
        .filter((n) => n.endsWith("FilePath"));

      const assetsTypeText = assetsType.getText();
      const assetsTypeMatch = assetsTypeText.match(/(\w+Assets)/);
      if (assetsTypeMatch && assetsTypeMatch[1]) {
        const assetsTypeName = assetsTypeMatch[1];
        assetComments = extractAssetFieldComments(assetsTypeName);
        console.log(`Extracted comments for ${assetsTypeName}:`, assetComments);
      }
    }

    // --- Insert or update GenerateRequest type alias after last import ---
    let genType = source.getTypeAlias("GenerateRequest");
    const fields = filePathKeys.length
      ? filePathKeys
          .map((k) => {
            const comment = assetComments[k] || "File input";
            return `/** ${comment} */\n    ${k}: string;`;
          })
          .join("\n    ")
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
    const uploadLines = filePathKeys
      .map((k) => `fileClient.uploadFile(${k})`)
      .join(",\n        ");

    const methodBody = `
const {
  waitForCompletion = true,
  downloadOutputs = true,
  downloadDirectory = undefined,
  ...createOpts
} = opts;

${
  assetsProp
    ? `const fileClient = new FilesClient(this._client, this._opts);`
    : ""
}

${
  !assetsProp
    ? ""
    : filePathKeys.length > 0
    ? `const { ${filePathKeys.join(", ")}, ...restAssets } = request.assets;`
    : `const restAssets = request.assets;`
}

${
  filePathKeys.length
    ? `const [${filePathKeys
        .map((k) => "uploaded" + pascalCase(k))
        .join(", ")}] = await Promise.all([
  ${uploadLines},
]);`
    : ""
}

// Create the initial request
const createResponse = await this.create(
  {
    ...request,
    ${
      assetsProp
        ? `assets: {
      ...restAssets,
      ${filePathKeys
        .map((k) => `${k}: uploaded${pascalCase(k)}`)
        .join(",\n      ")}
    },`
        : ""
    }
  },
  createOpts,
);

// Create image projects client to check result
const imageProjectsClient = new ImageProjectsClient(this._client, this._opts);

const result = await imageProjectsClient.checkResult(
  { id: createResponse.id },
  {
    waitForCompletion,
    downloadOutputs,
    downloadDirectory,
    ...createOpts,
  },
);

if (downloadOutputs) {
  result.downloadedPaths = await downloadFiles(
    result.downloads,
    downloadDirectory,
  );
}

return result;
`;

    const createJsDocs = createMethod.getJsDocs();

    const createDocText =
      createJsDocs.length > 0
        ? createJsDocs.map((d) => d.getInnerText().trim()).join("\n")
        : "AI generate helper with automatic polling and downloading.\n";

    const docs = [
      {
        description: `${createDocText
          .split(".")[0]
          ?.trim()} - Generate with automatic polling and downloading

- This method provides a convenient way to create a request and automatically wait for completion and download outputs.
`,
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
