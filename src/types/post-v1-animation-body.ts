import {
  External$PostV1AnimationBodyAssets,
  PostV1AnimationBodyAssets,
  Schemas$PostV1AnimationBodyAssets,
} from "./post-v1-animation-body-assets";
import {
  External$PostV1AnimationBodyStyle,
  PostV1AnimationBodyStyle,
  Schemas$PostV1AnimationBodyStyle,
} from "./post-v1-animation-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * PostV1AnimationBody
 */
export type PostV1AnimationBody = {
  /**
   * Provide the assets for animation.
   */
  assets: PostV1AnimationBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * The desire output video frame rate
   */
  fps: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * Defines the style of the output video
   */
  style: PostV1AnimationBodyStyle;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * PostV1AnimationBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$PostV1AnimationBody = {
  assets: External$PostV1AnimationBodyAssets;
  end_seconds: number;
  fps: number;
  height: number;
  name?: string | undefined;
  style: External$PostV1AnimationBodyStyle;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object PostV1AnimationBody
 */
const SchemaIn$PostV1AnimationBody: z.ZodType<
  PostV1AnimationBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$PostV1AnimationBodyAssets.in,
    end_seconds: z.number(),
    fps: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$PostV1AnimationBodyStyle.in,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      fps: "fps",
      height: "height",
      name: "name",
      style: "style",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$PostV1AnimationBody
 */
const SchemaOut$PostV1AnimationBody: z.ZodType<
  External$PostV1AnimationBody, // output type of this zod object
  z.ZodTypeDef,
  PostV1AnimationBody // the object to be transformed
> = z
  .object({
    assets: Schemas$PostV1AnimationBodyAssets.out,
    endSeconds: z.number(),
    fps: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$PostV1AnimationBodyStyle.out,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      fps: "fps",
      height: "height",
      name: "name",
      style: "style",
      width: "width",
    });
  });

export const Schemas$PostV1AnimationBody = {
  in: SchemaIn$PostV1AnimationBody,
  out: SchemaOut$PostV1AnimationBody,
};
