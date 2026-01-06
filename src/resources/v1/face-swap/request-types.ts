import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1FaceSwapCreateBodyAssets,
  Schemas$V1FaceSwapCreateBodyAssets,
  V1FaceSwapCreateBodyAssets,
} from "magic-hour/types/v1-face-swap-create-body-assets";
import {
  External$V1FaceSwapCreateBodyStyle,
  Schemas$V1FaceSwapCreateBodyStyle,
  V1FaceSwapCreateBodyStyle,
} from "magic-hour/types/v1-face-swap-create-body-style";

/**
 * CreateRequest
 */
export type CreateRequest = {
  /**
   * Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1FaceSwapCreateBodyAssets;
  /**
   * End time of your clip (seconds). Must be greater than start_seconds.
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
   * Give your video a custom name for easy identification.
   */
  name?: string | undefined;
  /**
   * Start time of your clip (seconds). Must be ≥ 0.
   */
  startSeconds: number;
  /**
   * Style of the face swap video.
   */
  style?: V1FaceSwapCreateBodyStyle | undefined;
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
 * CreateRequest without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$CreateRequest = {
  assets: External$V1FaceSwapCreateBodyAssets;
  end_seconds: number;
  height?: number | null | undefined;
  name?: string | undefined;
  start_seconds: number;
  style?: External$V1FaceSwapCreateBodyStyle | undefined;
  width?: number | null | undefined;
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
    assets: Schemas$V1FaceSwapCreateBodyAssets.in,
    end_seconds: z.number(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    start_seconds: z.number(),
    style: Schemas$V1FaceSwapCreateBodyStyle.in.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      name: "name",
      start_seconds: "startSeconds",
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
    assets: Schemas$V1FaceSwapCreateBodyAssets.out,
    endSeconds: z.number(),
    height: z.number().int().nullable().optional(),
    name: z.string().optional(),
    startSeconds: z.number(),
    style: Schemas$V1FaceSwapCreateBodyStyle.out.optional(),
    width: z.number().int().nullable().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      name: "name",
      startSeconds: "start_seconds",
      style: "style",
      width: "width",
    });
  });

export const Schemas$CreateRequest = {
  in: SchemaIn$CreateRequest,
  out: SchemaOut$CreateRequest,
};
