import { RequestOptions } from "magic-hour/core";

export type GenerateOptions = RequestOptions & {
  /**
   * Whether to wait for the generation to complete before returning the result.
   *
   * @default true
   */
  waitForCompletion?: boolean;
  /**
   * Whether to download the generated outputs to local disk.
   *
   * @default true
   */
  downloadOutputs?: boolean;
  /**
   * The directory to save the downloaded outputs.
   *
   * @default undefined
   */
  downloadDirectory?: string | undefined;
};

type WithoutFilePathKeys<T> = Omit<T, `${string}FilePath`>;

export type GenerateRequestType<
  CreateRequest extends { assets: any },
  AssetOverrides,
> = Omit<CreateRequest, "assets"> & {
  assets: Omit<CreateRequest["assets"], `${string}FilePath`> & AssetOverrides;
};
