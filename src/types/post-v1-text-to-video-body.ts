import {
  External$PostV1TextToVideoBodyStyle,
  PostV1TextToVideoBodyStyle,
  Schemas$PostV1TextToVideoBodyStyle,
} from "./post-v1-text-to-video-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1TextToVideoBody
 */
export type PostV1TextToVideoBody = {
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
 * PostV1TextToVideoBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1TextToVideoBody = {
  end_seconds: number;
  name?: string | undefined;
  orientation: "landscape" | "portrait" | "square";
  style: External$PostV1TextToVideoBodyStyle;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1TextToVideoBody
 */
const SchemaIn$PostV1TextToVideoBody: z.ZodType<
  PostV1TextToVideoBody, // output type of this zod object
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1TextToVideoBody
 */
const SchemaOut$PostV1TextToVideoBody: z.ZodType<
  External$PostV1TextToVideoBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1TextToVideoBody // the object to be transformed
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

export const Schemas$PostV1TextToVideoBody = {
  in: SchemaIn$PostV1TextToVideoBody,
  out: SchemaOut$PostV1TextToVideoBody,
};
