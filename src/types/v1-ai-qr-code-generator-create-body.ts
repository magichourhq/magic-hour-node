import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AiQrCodeGeneratorCreateBodyStyle,
  Schemas$V1AiQrCodeGeneratorCreateBodyStyle,
  V1AiQrCodeGeneratorCreateBodyStyle,
} from "./v1-ai-qr-code-generator-create-body-style";

/**
 * V1AiQrCodeGeneratorCreateBody
 */
export type V1AiQrCodeGeneratorCreateBody = {
  /**
   * The content of the QR code.
   */
  content: string;
  /**
   * Give your image a custom name for easy identification.
   */
  name?: string | undefined;
  style: V1AiQrCodeGeneratorCreateBodyStyle;
};

/**
 * @internal
 * V1AiQrCodeGeneratorCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiQrCodeGeneratorCreateBody = {
  content: string;
  name?: string | undefined;
  style: External$V1AiQrCodeGeneratorCreateBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiQrCodeGeneratorCreateBody
 */
const SchemaIn$V1AiQrCodeGeneratorCreateBody: z.ZodType<
  V1AiQrCodeGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    content: z.string(),
    name: z.string().optional(),
    style: Schemas$V1AiQrCodeGeneratorCreateBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      content: "content",
      name: "name",
      style: "style",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiQrCodeGeneratorCreateBody
 */
const SchemaOut$V1AiQrCodeGeneratorCreateBody: z.ZodType<
  External$V1AiQrCodeGeneratorCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AiQrCodeGeneratorCreateBody // the object to be transformed
> = z
  .object({
    content: z.string(),
    name: z.string().optional(),
    style: Schemas$V1AiQrCodeGeneratorCreateBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      content: "content",
      name: "name",
      style: "style",
    });
  });

export const Schemas$V1AiQrCodeGeneratorCreateBody = {
  in: SchemaIn$V1AiQrCodeGeneratorCreateBody,
  out: SchemaOut$V1AiQrCodeGeneratorCreateBody,
};
