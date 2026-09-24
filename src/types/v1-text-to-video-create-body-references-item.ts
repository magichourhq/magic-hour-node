import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1TextToVideoCreateBodyReferencesItem
 */
export type V1TextToVideoCreateBodyReferencesItem = {
  filePath: string;
  name: string;
};

/**
 * @internal
 * V1TextToVideoCreateBodyReferencesItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1TextToVideoCreateBodyReferencesItem = {
  file_path: string;
  name: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1TextToVideoCreateBodyReferencesItem
 */
const SchemaIn$V1TextToVideoCreateBodyReferencesItem: z.ZodType<
  V1TextToVideoCreateBodyReferencesItem, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1TextToVideoCreateBodyReferencesItem
 */
const SchemaOut$V1TextToVideoCreateBodyReferencesItem: z.ZodType<
  External$V1TextToVideoCreateBodyReferencesItem, // output type of this zod object
  z.ZodTypeDef,
  V1TextToVideoCreateBodyReferencesItem // the object to be transformed
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

export const Schemas$V1TextToVideoCreateBodyReferencesItem = {
  in: SchemaIn$V1TextToVideoCreateBodyReferencesItem,
  out: SchemaOut$V1TextToVideoCreateBodyReferencesItem,
};
