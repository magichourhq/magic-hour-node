import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * Face editing parameters
 */
export type V1AiFaceEditorCreateBodyStyle = {
  /**
   * Enhance face features
   */
  enhanceFace: boolean;
  /**
   * Horizontal eye gaze (-100 to 100), in increments of 5
   */
  eyeGazeHorizontal: number;
  /**
   * Vertical eye gaze (-100 to 100), in increments of 5
   */
  eyeGazeVertical: number;
  /**
   * Eye open ratio (-100 to 100), in increments of 5
   */
  eyeOpenRatio: number;
  /**
   * Eyebrow direction (-100 to 100), in increments of 5
   */
  eyebrowDirection: number;
  /**
   * Head pitch (-100 to 100), in increments of 5
   */
  headPitch: number;
  /**
   * Head roll (-100 to 100), in increments of 5
   */
  headRoll: number;
  /**
   * Head yaw (-100 to 100), in increments of 5
   */
  headYaw: number;
  /**
   * Lip open ratio (-100 to 100), in increments of 5
   */
  lipOpenRatio: number;
  /**
   * Mouth grim (-100 to 100), in increments of 5
   */
  mouthGrim: number;
  /**
   * Horizontal mouth position (-100 to 100), in increments of 5
   */
  mouthPositionHorizontal: number;
  /**
   * Vertical mouth position (-100 to 100), in increments of 5
   */
  mouthPositionVertical: number;
  /**
   * Mouth pout (-100 to 100), in increments of 5
   */
  mouthPout: number;
  /**
   * Mouth purse (-100 to 100), in increments of 5
   */
  mouthPurse: number;
  /**
   * Mouth smile (-100 to 100), in increments of 5
   */
  mouthSmile: number;
};

/**
 * @internal
 * V1AiFaceEditorCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AiFaceEditorCreateBodyStyle = {
  enhance_face: boolean;
  eye_gaze_horizontal: number;
  eye_gaze_vertical: number;
  eye_open_ratio: number;
  eyebrow_direction: number;
  head_pitch: number;
  head_roll: number;
  head_yaw: number;
  lip_open_ratio: number;
  mouth_grim: number;
  mouth_position_horizontal: number;
  mouth_position_vertical: number;
  mouth_pout: number;
  mouth_purse: number;
  mouth_smile: number;
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
    enhance_face: z.boolean(),
    eye_gaze_horizontal: z.number(),
    eye_gaze_vertical: z.number(),
    eye_open_ratio: z.number(),
    eyebrow_direction: z.number(),
    head_pitch: z.number(),
    head_roll: z.number(),
    head_yaw: z.number(),
    lip_open_ratio: z.number(),
    mouth_grim: z.number(),
    mouth_position_horizontal: z.number(),
    mouth_position_vertical: z.number(),
    mouth_pout: z.number(),
    mouth_purse: z.number(),
    mouth_smile: z.number(),
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
    enhanceFace: z.boolean(),
    eyeGazeHorizontal: z.number(),
    eyeGazeVertical: z.number(),
    eyeOpenRatio: z.number(),
    eyebrowDirection: z.number(),
    headPitch: z.number(),
    headRoll: z.number(),
    headYaw: z.number(),
    lipOpenRatio: z.number(),
    mouthGrim: z.number(),
    mouthPositionHorizontal: z.number(),
    mouthPositionVertical: z.number(),
    mouthPout: z.number(),
    mouthPurse: z.number(),
    mouthSmile: z.number(),
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
