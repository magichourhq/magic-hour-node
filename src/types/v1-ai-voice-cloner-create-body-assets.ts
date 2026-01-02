import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * Provide the assets for voice cloning.
 */
export type V1AiVoiceClonerCreateBodyAssets = {
  /**
   * The audio used to clone the voice. This value is either
   * - a direct URL to the video file
   * - `file_path` field from the response of the [upload urls API](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls).
   *
   * Please refer to the [Input File documentation](https://docs.magichour.ai/api-reference/files/generate-asset-upload-urls#input-file) to learn more.
   *
   */
  audioFilePath: string;
};

/**
 * @internal
 * V1AiVoiceClonerCreateBodyAssets without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiVoiceClonerCreateBodyAssets = {
  audio_file_path: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiVoiceClonerCreateBodyAssets
 */
const SchemaIn$V1AiVoiceClonerCreateBodyAssets: z.ZodType<
  V1AiVoiceClonerCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    audio_file_path: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audio_file_path: "audioFilePath",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiVoiceClonerCreateBodyAssets
 */
const SchemaOut$V1AiVoiceClonerCreateBodyAssets: z.ZodType<
  External$V1AiVoiceClonerCreateBodyAssets, // output type of this zod object
  z.ZodTypeDef,
  V1AiVoiceClonerCreateBodyAssets // the object to be transformed
> = z
  .object({
    audioFilePath: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      audioFilePath: "audio_file_path",
    });
  });

export const Schemas$V1AiVoiceClonerCreateBodyAssets = {
  in: SchemaIn$V1AiVoiceClonerCreateBodyAssets,
  out: SchemaOut$V1AiVoiceClonerCreateBodyAssets,
};
