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
   * This field does not affect the output video's resolution. The video's orientation will match that of the input image.
   *
   * It is retained solely for backward compatibility and will be deprecated in the future.
   */
  height?: number | undefined;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * Attributed used to dictate the style of the output
   */
  style: V1ImageToVideoCreateBodyStyle;
  /**
   * This field does not affect the output video's resolution. The video's orientation will match that of the input image.
   *
   * It is retained solely for backward compatibility and will be deprecated in the future.
   */
  width?: number | undefined;
};

/**
 * @internal
 * V1ImageToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBody = {
  assets: External$V1ImageToVideoCreateBodyAssets;
  end_seconds: number;
  height?: number | undefined;
  name?: string | undefined;
  style: External$V1ImageToVideoCreateBodyStyle;
  width?: number | undefined;
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
    height: z.number().int().optional(),
    name: z.string().optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.in,
    width: z.number().int().optional(),
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
    height: z.number().int().optional(),
    name: z.string().optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.out,
    width: z.number().int().optional(),
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
