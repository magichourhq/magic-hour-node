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
   * `height` is deprecated and no longer influences the output video's resolution.
   *
   * Output resolution is determined by the **minimum** of:
   * - The resolution of the input video
   * - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  height?: number | null | undefined;
  /**
   * The name of video. This value is mainly used for your own identification of the video.
   */
  name?: string | undefined;
  /**
   * Controls the output video resolution. Defaults to `720p` if not specified.
   *
   * 480p and 720p are available on Creator, Pro, or Business tiers. However, 1080p require Pro or Business tier.
   *
   * **Options:**
   * - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds.
   * - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds.
   * - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds.
   */
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  /**
   * Attributed used to dictate the style of the output
   */
  style?: V1ImageToVideoCreateBodyStyle | undefined;
  /**
   * `width` is deprecated and no longer influences the output video's resolution.
   *
   * Output resolution is determined by the **minimum** of:
   * - The resolution of the input video
   * - The maximum resolution allowed by your subscription tier. See our [pricing page](https://magichour.ai/pricing) for more details.
   *
   * This field is retained only for backward compatibility and will be removed in a future release.
   */
  width?: number | null | undefined;
};

/**
 * @internal
 * V1ImageToVideoCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1ImageToVideoCreateBody = {
  assets: External$V1ImageToVideoCreateBodyAssets;
  end_seconds: number;
  height?: number | null | undefined;
  name?: string | undefined;
  resolution?: ("1080p" | "480p" | "720p") | undefined;
  style?: External$V1ImageToVideoCreateBodyStyle | undefined;
  width?: number | null | undefined;
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
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.in.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      name: "name",
      resolution: "resolution",
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
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    resolution: z.enum(["1080p", "480p", "720p"]).optional(),
    style: Schemas$V1ImageToVideoCreateBodyStyle.out.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      name: "name",
      resolution: "resolution",
      style: "style",
      width: "width",
    });
  });

export const Schemas$V1ImageToVideoCreateBody = {
  in: SchemaIn$V1ImageToVideoCreateBody,
  out: SchemaOut$V1ImageToVideoCreateBody,
};
