/**
 * The mode of face swap.
 * * `all-faces` - Swap all faces in the target image or video. `source_file_path` is required.
 * * `individual-faces` - Swap individual faces in the target image or video. `source_faces` is required.
 */
export type V1FaceSwapCreateBodyAssetsFaceSwapModeEnum =
  | "all-faces"
  | "individual-faces";
