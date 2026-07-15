import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1CharacterReplaceCreateBodyStylePointsItem,
  Schemas$V1CharacterReplaceCreateBodyStylePointsItem,
  V1CharacterReplaceCreateBodyStylePointsItem,
} from "./v1-character-replace-create-body-style-points-item";

/**
 * Optional style controls for replace vs animate mode and subject selection.
 */
export type V1CharacterReplaceCreateBodyStyle = {
  /**
   * Processing mode. `replace` swaps the detected subject with your reference character. `animate` transfers motion from the video onto your character image.
   */
  mode?: ("animate" | "replace") | undefined;
  /**
   * On-frame markers for manual subject selection. Required when `selection_mode` is `point`. Ignored when `selection_mode` is `auto` or omitted.
   */
  points?: V1CharacterReplaceCreateBodyStylePointsItem[] | undefined;
  /**
   * How to locate the subject in the source video. `auto` detects a person automatically. `point` uses your `points` to mark the subject. Defaults to `auto`.
   */
  selectionMode?: ("auto" | "point") | undefined;
};

/**
 * @internal
 * V1CharacterReplaceCreateBodyStyle without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1CharacterReplaceCreateBodyStyle = {
  mode?: ("animate" | "replace") | undefined;
  points?: External$V1CharacterReplaceCreateBodyStylePointsItem[] | undefined;
  selection_mode?: ("auto" | "point") | undefined;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1CharacterReplaceCreateBodyStyle
 */
const SchemaIn$V1CharacterReplaceCreateBodyStyle: z.ZodType<
  V1CharacterReplaceCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    mode: z.enum(["animate", "replace"]).optional(),
    points: z
      .array(Schemas$V1CharacterReplaceCreateBodyStylePointsItem.in)
      .optional(),
    selection_mode: z.enum(["auto", "point"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      mode: "mode",
      points: "points",
      selection_mode: "selectionMode",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1CharacterReplaceCreateBodyStyle
 */
const SchemaOut$V1CharacterReplaceCreateBodyStyle: z.ZodType<
  External$V1CharacterReplaceCreateBodyStyle, // output type of this zod object
  z.ZodTypeDef,
  V1CharacterReplaceCreateBodyStyle // the object to be transformed
> = z
  .object({
    mode: z.enum(["animate", "replace"]).optional(),
    points: z
      .array(Schemas$V1CharacterReplaceCreateBodyStylePointsItem.out)
      .optional(),
    selectionMode: z.enum(["auto", "point"]).optional(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      mode: "mode",
      points: "points",
      selectionMode: "selection_mode",
    });
  });

export const Schemas$V1CharacterReplaceCreateBodyStyle = {
  in: SchemaIn$V1CharacterReplaceCreateBodyStyle,
  out: SchemaOut$V1CharacterReplaceCreateBodyStyle,
};
