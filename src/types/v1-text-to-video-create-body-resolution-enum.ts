/**
 * Controls the output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers.
 *
 * * **`ltx-2`**: Supports 480p, 720p, 1080p.
 * * **`seedance`**: Supports 480p, 720p, 1080p.
 * * **`kling-2.5`**: Supports 720p, 1080p.
 * * **`kling-3.0`**: Supports 720p, 1080p.
 * * **`sora-2`**: Supports 720p.
 * * **`veo3.1`**: Supports 720p, 1080p.
 *
 * Legacy models:
 * * **`kling-1.6`**: Supports 720p, 1080p.
 */
export type V1TextToVideoCreateBodyResolutionEnum = "1080p" | "480p" | "720p";
