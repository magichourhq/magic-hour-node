/**
 * Controls the output video resolution. Defaults to `720p` if not specified.
 *
 * 480p and 720p are available on Creator, Pro, or Business tiers. However, 1080p require Pro or Business tier.
 *
 * **Options:**
 * - `480p` - Supports only 5 or 10 second videos. Output: 24fps. Cost: 120 credits per 5 seconds.
 * - `720p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 300 credits per 5 seconds.
 * - `1080p` - Supports videos between 5-60 seconds. Output: 30fps. Cost: 600 credits per 5 seconds.
 */
export type V1TextToVideoCreateBodyResolutionEnum = "1080p" | "480p" | "720p";
