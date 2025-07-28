/**
 * The mode of face swap.
 * * `all-faces` - Swap all faces in the target image. `source_file_path` is required.
 * * `individual-faces` - Swap individual faces in the target image. `source_faces` is required.
 */
export type V1FaceSwapPhotoCreateBodyAssetsFaceSwapModeEnum =
  | "all-faces"
  | "individual-faces";
