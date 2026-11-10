/**
 * Model to use. Defaults to `wan-animate`.
 *
 * * **`wan-animate`**: 480p, 720p. Supports `points` subject selection.
 * * **`kling-3.0`**: 720p, 1080p. Clips of 3–10 seconds in `replace` mode or 3–30 seconds in `animate` mode. Picks the main person automatically, so `points` are rejected.
 * * **`minimax-h3`**: 480p, 720p, 1080p. Clips of 1–60 seconds in `replace` mode or 1–60 seconds in `animate` mode. Subject `points` are `replace`-only; `animate` with `selection_mode` `point` returns 422, and with `auto` or no `selection_mode` the points are ignored.
 */
export type V1CharacterReplaceCreateBodyModelEnum =
  | "kling-3.0"
  | "minimax-h3"
  | "wan-animate";
