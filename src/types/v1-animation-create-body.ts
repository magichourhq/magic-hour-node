import {
  External$V1AnimationCreateBodyAssets,
  Schemas$V1AnimationCreateBodyAssets,
  V1AnimationCreateBodyAssets,
} from "./v1-animation-create-body-assets";
import {
  External$V1AnimationCreateBodyStyle,
  Schemas$V1AnimationCreateBodyStyle,
  V1AnimationCreateBodyStyle,
} from "./v1-animation-create-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1AnimationCreateBody
 */
export type V1AnimationCreateBody = {
  /**
   * Provide the assets for animation.
   */
  assets: V1AnimationCreateBodyAssets;
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
  style: V1AnimationCreateBodyStyle;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * V1AnimationCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AnimationCreateBody = {
  assets: External$V1AnimationCreateBodyAssets;
  end_seconds: number;
  fps: number;
  height: number;
  name?: string | undefined;
  style: External$V1AnimationCreateBodyStyle;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AnimationCreateBody
 */
const SchemaIn$V1AnimationCreateBody: z.ZodType<
  V1AnimationCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1AnimationCreateBodyAssets.in,
    end_seconds: z.number(),
    fps: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1AnimationCreateBodyStyle.in,
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AnimationCreateBody
 */
const SchemaOut$V1AnimationCreateBody: z.ZodType<
  External$V1AnimationCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1AnimationCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1AnimationCreateBodyAssets.out,
    endSeconds: z.number(),
    fps: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1AnimationCreateBodyStyle.out,
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

export const Schemas$V1AnimationCreateBody = {
  in: SchemaIn$V1AnimationCreateBody,
  out: SchemaOut$V1AnimationCreateBody,
};
