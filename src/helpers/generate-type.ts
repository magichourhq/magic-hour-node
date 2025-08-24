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

type FilePathKeys<T> = Extract<keyof T, `${string}FilePath`>;

/**
 * A type that allows you to override the `${string}FilePath` fields of the assets object.
 *
 * This is necessary to override the jsdoc for the asset fields, which now support local paths.
 *
 * @example
 * ```ts
 * type GenerateRequest = GenerateRequestType<requests.CreateRequest, {
 *   // custom jsdoc for the asset field
 *   garmentFilePath: string;
 * }>;
 * ```
 */
export type GenerateRequestType<
  CreateRequest extends { assets: Record<string, any> },
  AssetOverrides extends {
    [K in FilePathKeys<CreateRequest["assets"]>]: string;
  } & {
    // 🚫 forbid extra keys:
    [K in Exclude<
      keyof AssetOverrides,
      FilePathKeys<CreateRequest["assets"]>
    >]: {
      ERROR: `AssetOverrides can only contain ${FilePathKeys<
        CreateRequest["assets"]
      >}`;
    };
  },
> = Omit<CreateRequest, "assets"> & {
  assets: Omit<CreateRequest["assets"], `${string}FilePath`> & AssetOverrides;
};
