import {
  External$PostV1AiQrCodeGeneratorBodyStyle,
  PostV1AiQrCodeGeneratorBodyStyle,
  Schemas$PostV1AiQrCodeGeneratorBodyStyle,
} from "./post-v1-ai-qr-code-generator-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AiQrCodeGeneratorBody
 */
export type PostV1AiQrCodeGeneratorBody = {
  /**
   * The content of the QR code.
   */
  content: string;
  /**
   * The name of image
   */
  name?: string | undefined;
  style: PostV1AiQrCodeGeneratorBodyStyle;
};

/**
 * @internal
 * PostV1AiQrCodeGeneratorBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AiQrCodeGeneratorBody = {
  content: string;
  name?: string | undefined;
  style: External$PostV1AiQrCodeGeneratorBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AiQrCodeGeneratorBody
 */
const SchemaIn$PostV1AiQrCodeGeneratorBody: z.ZodType<
  PostV1AiQrCodeGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    content: z.string(),
    name: z.string().optional(),
    style: Schemas$PostV1AiQrCodeGeneratorBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AiQrCodeGeneratorBody
 */
const SchemaOut$PostV1AiQrCodeGeneratorBody: z.ZodType<
  External$PostV1AiQrCodeGeneratorBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AiQrCodeGeneratorBody // the object to be transformed
> = z
  .object({
    content: z.string(),
    name: z.string().optional(),
    style: Schemas$PostV1AiQrCodeGeneratorBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      content: "content",
      name: "name",
      style: "style",
    });
  });

export const Schemas$PostV1AiQrCodeGeneratorBody = {
  in: SchemaIn$PostV1AiQrCodeGeneratorBody,
  out: SchemaOut$PostV1AiQrCodeGeneratorBody,
};
