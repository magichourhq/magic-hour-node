/**
 * * `v1` - May preserve skin detail and texture better, but weaker identity preservation.
 * * `v2` - Faster, sharper, better handling of hair and glasses. stronger identity preservation.
 * * `default` - Use the version we recommend, which will change over time. This is recommended unless you need a specific earlier version. This is the default behavior.
 */
export type V1FaceSwapCreateBodyStyleVersionEnum = "default" | "v1" | "v2";
