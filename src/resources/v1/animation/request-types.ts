import { zodTransform } from "magic-hour/core";
import {
  External$V1AnimationCreateBodyAssets,
  Schemas$V1AnimationCreateBodyAssets,
  V1AnimationCreateBodyAssets,
} from "magic-hour/types/v1-animation-create-body-assets";
import {
  External$V1AnimationCreateBodyStyle,
  Schemas$V1AnimationCreateBodyStyle,
  V1AnimationCreateBodyStyle,
} from "magic-hour/types/v1-animation-create-body-style";
import * as z from "zod";

/**
 * CreateRequest
 */
export type CreateRequest = {
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1AnimationCreateBodyAssets;
  end_seconds: number;
  fps: number;
  height: number;
  name?: string | undefined;
  style: External$V1AnimationCreateBodyStyle;
  width: number;
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
 * Takes typescript data, validates it, and maps keys to match the expected external object External$CreateRequest
 */
const SchemaOut$CreateRequest: z.ZodType<
  External$CreateRequest, // output type of this zod object
  z.ZodTypeDef,
  CreateRequest // the object to be transformed
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

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
