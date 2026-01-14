/**
 * Type of garment to swap. If not provided, swaps the entire outfit.
 * * `upper_body` - for shirts/jackets
 * * `lower_body` - for pants/skirts
 * * `dresses` - for entire outfit (deprecated, use `entire_outfit` instead)
 * * `entire_outfit` - for entire outfit
 */
export type V1AiClothesChangerCreateBodyAssetsGarmentTypeEnum =
  | "dresses"
  | "entire_outfit"
  | "lower_body"
  | "upper_body";
