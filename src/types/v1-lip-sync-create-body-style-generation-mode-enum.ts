/**
 * A specific version of our lip sync system, optimized for different needs.
 * * `lite` -  Fast lip sync - best for simple videos. Costs 1 credit per frame of video.
 * * `standard` -  Natural, accurate lip sync - best for most creators. Requires visible mouth movement in the opening seconds of the input video. Costs 1 credit per frame of video.
 * * `pro` -  Premium fidelity with enhanced detail - best for professionals. Requires visible mouth movement in the opening seconds of the input video. Costs 2 credits per frame of video.
 *
 * If your source is a still image, including a still image saved as a static video, use [AI Talking Photo](https://docs.magichour.ai/api-reference/video-projects/ai-talking-photo) with the original image and your audio instead.
 *
 * Note: `pro` is only available for users on Creator, Pro, and Business tiers.
 *
 */
export type V1LipSyncCreateBodyStyleGenerationModeEnum =
  | "lite"
  | "pro"
  | "standard";
