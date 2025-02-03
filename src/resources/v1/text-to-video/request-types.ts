import { zodTransform } from "magic-hour/core";
import {
  External$PostV1TextToVideoBodyStyle,
  PostV1TextToVideoBodyStyle,
  Schemas$PostV1TextToVideoBodyStyle,
} from "magic-hour/types/post-v1-text-to-video-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * The total duration of the output video in seconds.
   */
  endSeconds: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * Determines the orientation of the output video
   */
  orientation: "landscape" | "portrait" | "square";
  style: PostV1TextToVideoBodyStyle;
};

/**
 * @internal
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  end_seconds: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: External$PostV1TextToVideoBodyStyle;
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
    end_seconds: z.number(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$PostV1TextToVideoBodyStyle.in,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      end_seconds: "endSeconds",
      name: "name",
      orientation: "orientation",
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
    endSeconds: z.number(),
    name: z.string().optional(),
    orientation: z.enum(["landscape", "portrait", "square"]),
    style: Schemas$PostV1TextToVideoBodyStyle.out,
  })
  .transform((obj) => {
    return zodTransform(obj, {
      endSeconds: "end_seconds",
      name: "name",
      orientation: "orientation",
      style: "style",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
