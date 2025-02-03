import { zodTransform } from "magic-hour/core";
import {
  External$PostV1AiQrCodeGeneratorBodyStyle,
  PostV1AiQrCodeGeneratorBodyStyle,
  Schemas$PostV1AiQrCodeGeneratorBodyStyle,
} from "magic-hour/types/post-v1-ai-qr-code-generator-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  content: string;
  name?: string | undefined;
  style: External$PostV1AiQrCodeGeneratorBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object CreateRequest
 */
const SchemaIn$CreateRequest: z.ZodType<
  CreateRequest, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
