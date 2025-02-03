import * as z from "zod";
import { isUploadFile, UploadFile } from "./form-data";

/**
 * Generic function to transform an objects keys from one string to another.
 * If the incoming object does not have a transform key, the original key is retained.
 * If the incoming object has a key that maps to a `null` transform key, then
 * the value is skipped.
 */
export function zodTransform<
  Input extends Record<string, unknown>,
  const Transformer extends { [k in keyof Input]?: string | null },
>(input: Input, transformer: Transformer) {
  let transformed: any = {};

  for (const [key, val] of Object.entries(input)) {
    const toKey = transformer[key];

    if (toKey === null) {
      continue;
    }

    transformed[toKey ?? key] = val;
  }

  return transformed;
}

export const zodUploadFile = z.custom<UploadFile>((val) => isUploadFile(val));
// Workaround because the type zod infers from z.any() allows undefined
// https://github.com/colinhacks/zod/issues/3730
export const zodRequiredAny = z.custom<Required<any>>((x) => x !== undefined);
