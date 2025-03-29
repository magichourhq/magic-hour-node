import {
  External$V1ImageToVideoCreateBodyAssets,
  Schemas$V1ImageToVideoCreateBodyAssets,
  V1ImageToVideoCreateBodyAssets,
} from "./v1-image-to-video-create-body-assets";
import {
  External$V1ImageToVideoCreateBodyStyle,
  Schemas$V1ImageToVideoCreateBodyStyle,
  V1ImageToVideoCreateBodyStyle,
} from "./v1-image-to-video-create-body-style";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1ImageToVideoCreateBody
 */
export type V1ImageToVideoCreateBody = {
  /**
   * Provide the assets for image-to-video.
   */
  assets: V1ImageToVideoCreateBodyAssets;
  /**
   * The total duration of the output video in seconds.
   */
  endSeconds: number;
  /**
   * The height of the input video. This value will help determine the final orientation of the output video. The output video resolution may not match the input.
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  style: V1ImageToVideoCreateBodyStyle;
  /**
   * The width of the input video. This value will help determine the final orientation of the output video. The output video resolution may not match the input.
   */
  width: number;
};

/**
 * @internal
 * V1ImageToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBody = {
  assets: External$V1ImageToVideoCreateBodyAssets;
  end_seconds: number;
  height: number;
  name?: string | undefined;
  style: External$V1ImageToVideoCreateBodyStyle;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1ImageToVideoCreateBody
 */
const SchemaIn$V1ImageToVideoCreateBody: z.ZodType<
  V1ImageToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1ImageToVideoCreateBodyAssets.in,
    end_seconds: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.in,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      name: "name",
      style: "style",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1ImageToVideoCreateBody
 */
const SchemaOut$V1ImageToVideoCreateBody: z.ZodType<
  External$V1ImageToVideoCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1ImageToVideoCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1ImageToVideoCreateBodyAssets.out,
    endSeconds: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.out,
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      name: "name",
      style: "style",
      width: "width",
    });
  });

export const Schemas$V1ImageToVideoCreateBody = {
  in: SchemaIn$V1ImageToVideoCreateBody,
  out: SchemaOut$V1ImageToVideoCreateBody,
};
