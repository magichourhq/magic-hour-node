import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Style of the face swap video.
 */
export type V1FaceSwapCreateBodyStyle = {
  /**
   * * `v1` - May preserve skin detail and texture better, but weaker identity preservation.
   * * `v2` - Faster, sharper, better handling of hair and glasses. stronger identity preservation. (Recommended)
   * * `default` - Use the version we recommend, which will change over time. This is recommended unless you need a specific earlier version. This is the default behavior.
   */
  version?: ("default" | "v1" | "v2") | undefined;
};

/**
 * @internal
 * V1FaceSwapCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateBodyStyle = {
  version?: ("default" | "v1" | "v2") | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateBodyStyle
 */
const SchemaIn$V1FaceSwapCreateBodyStyle: z.ZodType<
  V1FaceSwapCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    version: z.enum(["default", "v1", "v2"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      version: "version",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateBodyStyle
 */
const SchemaOut$V1FaceSwapCreateBodyStyle: z.ZodType<
  External$V1FaceSwapCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateBodyStyle // the object to be transformed
> = z
  .object({
    version: z.enum(["default", "v1", "v2"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      version: "version",
    });
  });

export const Schemas$V1FaceSwapCreateBodyStyle = {
  in: SchemaIn$V1FaceSwapCreateBodyStyle,
  out: SchemaOut$V1FaceSwapCreateBodyStyle,
};
