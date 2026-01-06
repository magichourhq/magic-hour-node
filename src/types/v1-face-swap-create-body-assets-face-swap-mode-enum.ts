/**
 * Choose how to swap faces:
 * **all-faces** (recommended) — swap all detected faces using one source image (`source_file_path` required)
 * +- **individual-faces** — specify exact mappings using `face_mappings`
 */
export type V1FaceSwapCreateBodyAssetsFaceSwapModeEnum =
  | "all-faces"
  | "individual-faces";
