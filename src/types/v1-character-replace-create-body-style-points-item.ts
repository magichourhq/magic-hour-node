import { zodTransform } from "make-api-request-js";
import * as z from "zod";

/**
 * V1CharacterReplaceCreateBodyStylePointsItem
 */
export type V1CharacterReplaceCreateBodyStylePointsItem = {
  /**
   * Horizontal pixel coordinate in the source video frame at `time_seconds`, measured from the left edge.
   */
  positionX: number;
  /**
   * Vertical pixel coordinate in the source video frame at `time_seconds`, measured from the top edge.
   */
  positionY: number;
  /**
   * Timestamp on the source video timeline in seconds. Uses the same clock as `start_seconds` and `end_seconds`.
   */
  timeSeconds: number;
};

/**
 * @internal
 * V1CharacterReplaceCreateBodyStylePointsItem without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1CharacterReplaceCreateBodyStylePointsItem = {
  position_x: number;
  position_y: number;
  time_seconds: number;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1CharacterReplaceCreateBodyStylePointsItem
 */
const SchemaIn$V1CharacterReplaceCreateBodyStylePointsItem: z.ZodType<
  V1CharacterReplaceCreateBodyStylePointsItem, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    position_x: z.number().int(),
    position_y: z.number().int(),
    time_seconds: z.number(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      position_x: "positionX",
      position_y: "positionY",
      time_seconds: "timeSeconds",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1CharacterReplaceCreateBodyStylePointsItem
 */
const SchemaOut$V1CharacterReplaceCreateBodyStylePointsItem: z.ZodType<
  External$V1CharacterReplaceCreateBodyStylePointsItem, // output type of this zod object
  z.ZodTypeDef,
  V1CharacterReplaceCreateBodyStylePointsItem // the object to be transformed
> = z
  .object({
    positionX: z.number().int(),
    positionY: z.number().int(),
    timeSeconds: z.number(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      positionX: "position_x",
      positionY: "position_y",
      timeSeconds: "time_seconds",
    });
  });

export const Schemas$V1CharacterReplaceCreateBodyStylePointsItem = {
  in: SchemaIn$V1CharacterReplaceCreateBodyStylePointsItem,
  out: SchemaOut$V1CharacterReplaceCreateBodyStylePointsItem,
};
