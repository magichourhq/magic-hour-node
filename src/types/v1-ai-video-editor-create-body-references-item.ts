import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1AiVideoEditorCreateBodyReferencesItem
 */
export type V1AiVideoEditorCreateBodyReferencesItem = {
  /**
   * This value is either
   * - a direct URL to the file. The URL path must end in a supported file extension.
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * See the [file upload guide](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) for details.
   *
   */
  filePath: string;
  name: string;
};

/**
 * @internal
 * V1AiVideoEditorCreateBodyReferencesItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVideoEditorCreateBodyReferencesItem = {
  file_path: string;
  name: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVideoEditorCreateBodyReferencesItem
 */
const SchemaIn$V1AiVideoEditorCreateBodyReferencesItem: z.ZodType<
  V1AiVideoEditorCreateBodyReferencesItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    file_path: z.string(),
    name: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      file_path: "filePath",
      name: "name",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVideoEditorCreateBodyReferencesItem
 */
const SchemaOut$V1AiVideoEditorCreateBodyReferencesItem: z.ZodType<
  External$V1AiVideoEditorCreateBodyReferencesItem, // output type of this zod object
  z.ZodTypeDef,
  V1AiVideoEditorCreateBodyReferencesItem // the object to be transformed
> = z
  .object({
    filePath: z.string(),
    name: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      filePath: "file_path",
      name: "name",
    });
  });

export const Schemas$V1AiVideoEditorCreateBodyReferencesItem = {
  in: SchemaIn$V1AiVideoEditorCreateBodyReferencesItem,
  out: SchemaOut$V1AiVideoEditorCreateBodyReferencesItem,
};
