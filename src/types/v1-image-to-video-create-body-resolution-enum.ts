/**
 * Controls the output video resolution. Defaults to `720p` if not specified.
 *
 * * **Default**: Supports `480p`, `720p`, and `1080p`.
 * * **Seedance**: Supports `480p`, `720p`, `1080p`.
 * * **Kling 2.5 Audio**: Supports `720p`, `1080p`.
 * * **Sora 2**: Supports `720p`.
 * * **Veo 3.1 Audio**: Supports `720p`, `1080p`.
 * * **Veo 3.1**: Supports `720p`, `1080p`.
 * * **Kling 1.6**: Supports `720p`, `1080p`.
 */
export type V1ImageToVideoCreateBodyResolutionEnum = "1080p" | "480p" | "720p";
