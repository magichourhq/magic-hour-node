import * as z from "zod";

import { zodTransform } from "magic-hour/core";

/**
 * Face editing parameters
 */
export type V1AiFaceEditorCreateBodyStyle = {
  /**
   * Enhance face features
   */
  enhanceFace?: boolean | undefined;
  /**
   * Horizontal eye gaze (-100 to 100), in increments of 5
   */
  eyeGazeHorizontal?: number | undefined;
  /**
   * Vertical eye gaze (-100 to 100), in increments of 5
   */
  eyeGazeVertical?: number | undefined;
  /**
   * Eye open ratio (-100 to 100), in increments of 5
   */
  eyeOpenRatio?: number | undefined;
  /**
   * Eyebrow direction (-100 to 100), in increments of 5
   */
  eyebrowDirection?: number | undefined;
  /**
   * Head pitch (-100 to 100), in increments of 5
   */
  headPitch?: number | undefined;
  /**
   * Head roll (-100 to 100), in increments of 5
   */
  headRoll?: number | undefined;
  /**
   * Head yaw (-100 to 100), in increments of 5
   */
  headYaw?: number | undefined;
  /**
   * Lip open ratio (-100 to 100), in increments of 5
   */
  lipOpenRatio?: number | undefined;
  /**
   * Mouth grim (-100 to 100), in increments of 5
   */
  mouthGrim?: number | undefined;
  /**
   * Horizontal mouth position (-100 to 100), in increments of 5
   */
  mouthPositionHorizontal?: number | undefined;
  /**
   * Vertical mouth position (-100 to 100), in increments of 5
   */
  mouthPositionVertical?: number | undefined;
  /**
   * Mouth pout (-100 to 100), in increments of 5
   */
  mouthPout?: number | undefined;
  /**
   * Mouth purse (-100 to 100), in increments of 5
   */
  mouthPurse?: number | undefined;
  /**
   * Mouth smile (-100 to 100), in increments of 5
   */
  mouthSmile?: number | undefined;
};

/**
 * @internal
 * V1AiFaceEditorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiFaceEditorCreateBodyStyle = {
  enhance_face?: boolean | undefined;
  eye_gaze_horizontal?: number | undefined;
  eye_gaze_vertical?: number | undefined;
  eye_open_ratio?: number | undefined;
  eyebrow_direction?: number | undefined;
  head_pitch?: number | undefined;
  head_roll?: number | undefined;
  head_yaw?: number | undefined;
  lip_open_ratio?: number | undefined;
  mouth_grim?: number | undefined;
  mouth_position_horizontal?: number | undefined;
  mouth_position_vertical?: number | undefined;
  mouth_pout?: number | undefined;
  mouth_purse?: number | undefined;
  mouth_smile?: number | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AiFaceEditorCreateBodyStyle
 */
const SchemaIn$V1AiFaceEditorCreateBodyStyle: z.ZodType<
  V1AiFaceEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    enhance_face: z.boolean().optional(),
    eye_gaze_horizontal: z.number().optional(),
    eye_gaze_vertical: z.number().optional(),
    eye_open_ratio: z.number().optional(),
    eyebrow_direction: z.number().optional(),
    head_pitch: z.number().optional(),
    head_roll: z.number().optional(),
    head_yaw: z.number().optional(),
    lip_open_ratio: z.number().optional(),
    mouth_grim: z.number().optional(),
    mouth_position_horizontal: z.number().optional(),
    mouth_position_vertical: z.number().optional(),
    mouth_pout: z.number().optional(),
    mouth_purse: z.number().optional(),
    mouth_smile: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhance_face: "enhanceFace",
      eye_gaze_horizontal: "eyeGazeHorizontal",
      eye_gaze_vertical: "eyeGazeVertical",
      eye_open_ratio: "eyeOpenRatio",
      eyebrow_direction: "eyebrowDirection",
      head_pitch: "headPitch",
      head_roll: "headRoll",
      head_yaw: "headYaw",
      lip_open_ratio: "lipOpenRatio",
      mouth_grim: "mouthGrim",
      mouth_position_horizontal: "mouthPositionHorizontal",
      mouth_position_vertical: "mouthPositionVertical",
      mouth_pout: "mouthPout",
      mouth_purse: "mouthPurse",
      mouth_smile: "mouthSmile",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AiFaceEditorCreateBodyStyle
 */
const SchemaOut$V1AiFaceEditorCreateBodyStyle: z.ZodType<
  External$V1AiFaceEditorCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1AiFaceEditorCreateBodyStyle // the object to be transformed
> = z
  .object({
    enhanceFace: z.boolean().optional(),
    eyeGazeHorizontal: z.number().optional(),
    eyeGazeVertical: z.number().optional(),
    eyeOpenRatio: z.number().optional(),
    eyebrowDirection: z.number().optional(),
    headPitch: z.number().optional(),
    headRoll: z.number().optional(),
    headYaw: z.number().optional(),
    lipOpenRatio: z.number().optional(),
    mouthGrim: z.number().optional(),
    mouthPositionHorizontal: z.number().optional(),
    mouthPositionVertical: z.number().optional(),
    mouthPout: z.number().optional(),
    mouthPurse: z.number().optional(),
    mouthSmile: z.number().optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      enhanceFace: "enhance_face",
      eyeGazeHorizontal: "eye_gaze_horizontal",
      eyeGazeVertical: "eye_gaze_vertical",
      eyeOpenRatio: "eye_open_ratio",
      eyebrowDirection: "eyebrow_direction",
      headPitch: "head_pitch",
      headRoll: "head_roll",
      headYaw: "head_yaw",
      lipOpenRatio: "lip_open_ratio",
      mouthGrim: "mouth_grim",
      mouthPositionHorizontal: "mouth_position_horizontal",
      mouthPositionVertical: "mouth_position_vertical",
      mouthPout: "mouth_pout",
      mouthPurse: "mouth_purse",
      mouthSmile: "mouth_smile",
    });
  });

export const Schemas$V1AiFaceEditorCreateBodyStyle = {
  in: SchemaIn$V1AiFaceEditorCreateBodyStyle,
  out: SchemaOut$V1AiFaceEditorCreateBodyStyle,
};
