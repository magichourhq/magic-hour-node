import {
  External$V1FaceSwapCreateBodyAssets,
  Schemas$V1FaceSwapCreateBodyAssets,
  V1FaceSwapCreateBodyAssets,
} from "./v1-face-swap-create-body-assets";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * V1FaceSwapCreateBody
 */
export type V1FaceSwapCreateBody = {
  /**
   * Provide the assets for face swap. For video, The `video_source` field determines whether `video_file_path` or `youtube_url` field is used
   */
  assets: V1FaceSwapCreateBodyAssets;
  /**
   * The end time of the input video in seconds
   */
  endSeconds: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * The name of video
   */
  name?: string | undefined;
  /**
   * The start time of the input video in seconds
   */
  startSeconds: number;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};

/**
 * @internal
 * V1FaceSwapCreateBody without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1FaceSwapCreateBody = {
  assets: External$V1FaceSwapCreateBodyAssets;
  end_seconds: number;
  height: number;
  name?: string | undefined;
  start_seconds: number;
  width: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1FaceSwapCreateBody
 */
const SchemaIn$V1FaceSwapCreateBody: z.ZodType<
  V1FaceSwapCreateBody, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    assets: Schemas$V1FaceSwapCreateBodyAssets.in,
    end_seconds: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    start_seconds: z.number(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      end_seconds: "endSeconds",
      height: "height",
      name: "name",
      start_seconds: "startSeconds",
      width: "width",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1FaceSwapCreateBody
 */
const SchemaOut$V1FaceSwapCreateBody: z.ZodType<
  External$V1FaceSwapCreateBody, // output type of this zod object
  z.ZodTypeDef,
  V1FaceSwapCreateBody // the object to be transformed
> = z
  .object({
    assets: Schemas$V1FaceSwapCreateBodyAssets.out,
    endSeconds: z.number(),
    height: z.number().int(),
    name: z.string().optional(),
    startSeconds: z.number(),
    width: z.number().int(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      assets: "assets",
      endSeconds: "end_seconds",
      height: "height",
      name: "name",
      startSeconds: "start_seconds",
      width: "width",
    });
  });

export const Schemas$V1FaceSwapCreateBody = {
  in: SchemaIn$V1FaceSwapCreateBody,
  out: SchemaOut$V1FaceSwapCreateBody,
};
