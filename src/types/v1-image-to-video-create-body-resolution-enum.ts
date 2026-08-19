/**
 * Controls the output video resolution. Defaults to `720p` on paid tiers and `480p` on free tiers.
 *
 * * **`kling-2.6`**: Supports 720p, 1080p.
 * * **`kling-3.0`**: Supports 720p, 1080p, 4k.
 * * **`ltx-2.3`**: Supports 480p, 720p, 1080p.
 * * **`minimax-h3`**: Supports 480p, 720p, 1080p.
 * * **`seedance-1.5`**: Supports 480p, 720p, 1080p.
 * * **`seedance-2.0`**: Supports 480p, 720p.
 * * **`seedance-2.0-mini`**: Supports 480p, 720p.
 * * **`seedance-2.5`**: Supports 480p, 720p.
 * * **`sora-2`**: Supports 720p.
 * * **`veo3.1`**: Supports 720p, 1080p.
 * * **`veo3.1-lite`**: Supports 720p, 1080p.
 * * **`wan-2.2`**: Supports 480p, 720p, 1080p.
 *
 */
export type V1ImageToVideoCreateBodyResolutionEnum =
  | "1080p"
  | "480p"
  | "4k"
  | "720p";
