import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type V1AiTalkingPhotoCreateResponse401 = {
  message: "Unauthorized";
};

/**
 * @internal
 * V1AiTalkingPhotoCreateResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiTalkingPhotoCreateResponse401 = {
  message: "Unauthorized";
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiTalkingPhotoCreateResponse401
 */
const SchemaIn$V1AiTalkingPhotoCreateResponse401: z.ZodType<
  V1AiTalkingPhotoCreateResponse401, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiTalkingPhotoCreateResponse401
 */
const SchemaOut$V1AiTalkingPhotoCreateResponse401: z.ZodType<
  External$V1AiTalkingPhotoCreateResponse401, // output type of this zod object
  z.ZodTypeDef,
  V1AiTalkingPhotoCreateResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$V1AiTalkingPhotoCreateResponse401 = {
  in: SchemaIn$V1AiTalkingPhotoCreateResponse401,
  out: SchemaOut$V1AiTalkingPhotoCreateResponse401,
};
