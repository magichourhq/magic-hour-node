import { RequestOptions } from "magic-hour/core";

/**
 * Options for the `generate` method.
 */
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

// Extract FilePath properties as they are (preserving optional/required)
type FilePathProps<T> = Pick<T, FilePathKeys<T>>;

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
  CreateRequest,
  AssetOverrides extends CreateRequest extends { assets: Record<string, any> }
    ? FilePathProps<CreateRequest["assets"]> & {
        // 🚫 forbid extra keys (except faceMappings):
        [K in Exclude<
          keyof AssetOverrides,
          FilePathKeys<CreateRequest["assets"]> | "faceMappings"
        >]: {
          ERROR: `AssetOverrides can only contain ${FilePathKeys<
            CreateRequest["assets"]
          >} or faceMappings`;
        };
      }
    : {},
> = CreateRequest extends { assets: Record<string, any> }
  ? Omit<CreateRequest, "assets"> & {
      assets: Omit<CreateRequest["assets"], `${string}FilePath`> &
        AssetOverrides;
    }
  : CreateRequest;
