// scripts/add-generate-methods.ts
import { Project } from "ts-morph";
import fg from "fast-glob";
import prettier from "prettier";
import fs from "fs";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

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
    if (assetsProp) {
      const assetsType = assetsProp.getTypeAtLocation(source);
      filePathKeys = assetsType
        .getProperties()
        .map((p) => p.getName())
        .filter((n) => n.endsWith("FilePath"));
    }

    // --- Insert or update GenerateRequest type alias after last import ---
    let genType = source.getTypeAlias("GenerateRequest");
    const fields = filePathKeys.length
      ? filePathKeys
          .map((k) => `/** File input */\n    ${k}: string;`)
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
    const assignLines = filePathKeys
      .map((k) => `${k}: uploaded${pascalCase(k)}`)
      .join(",\n          ");

    const methodBody = `
const {
  waitForCompletion = true,
  downloadOutputs = true,
  downloadDirectory = undefined,
  ...createOpts
} = opts;

const fileClient = new FilesClient(this._client, this._opts);

${
  filePathKeys.length > 0
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
    assets: {
      ...restAssets,
      ${filePathKeys.length ? assignLines : ""}
    },
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

return result;
`;

    if (!genMethod) {
      classDecl.insertMethod(ctor.getChildIndex() + 1, {
        isAsync: true,
        name: "generate",
        parameters: [
          { name: "request", type: "GenerateRequest" },
          { name: "opts", type: "GenerateOptions = {}" },
        ],
        statements: methodBody,
        docs: [
          {
            description:
              "AI generate helper with automatic polling and downloading.\n" +
              "@example\n```ts\nconst result = await client.v1." +
              classDecl.getNameOrThrow()[0]!.toLowerCase() +
              classDecl.getNameOrThrow().slice(1).replace("Client", "") +
              `.generate({\n  assets: {\n    ${filePathKeys
                .map((k) => `${k}: "path/to/file.jpg"`)
                .join(",\n    ")}\n  },\n});\n\`\`\``,
          },
        ],
      });
    } else {
      genMethod.setBodyText(methodBody);
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
