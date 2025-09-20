/**
 * A specific version of our lip sync system, optimized for different needs.
 * * `lite` -  Fast and affordable lip sync - best for simple videos. Costs 1 credit per frame of video.
 * * `standard` -  Natural, accurate lip sync - best for most creators. Costs 1 credit per frame of video.
 * * `pro` -  Premium fidelity with enhanced detail - best for professionals. Costs 2 credits per frame of video.
 *
 * Note: `standard` and `pro` are only available for users on Creator, Pro, and Business tiers.
 *
 */
export type V1LipSyncCreateBodyStyleGenerationModeEnum =
  | "lite"
  | "pro"
  | "standard";
