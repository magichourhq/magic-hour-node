/**
 * Generated by Sideko (sideko.dev)
 **/

import {
  DeleteV1VideoProjectsIdResponse401MessageEnum,
  External$DeleteV1VideoProjectsIdResponse401MessageEnum,
} from "./delete-v1-video-projects-id-response401-message-enum";
import { zodTransform } from "magic-hour/core";
import * as z from "zod";

/**
 * The request is not properly authenticated
 */
export type DeleteV1VideoProjectsIdResponse401 = {
  message: DeleteV1VideoProjectsIdResponse401MessageEnum;
};

/**
 * @internal
 * DeleteV1VideoProjectsIdResponse401 without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$DeleteV1VideoProjectsIdResponse401 = {
  message: External$DeleteV1VideoProjectsIdResponse401MessageEnum;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object DeleteV1VideoProjectsIdResponse401
 */
const SchemaIn$DeleteV1VideoProjectsIdResponse401: z.ZodType<
  DeleteV1VideoProjectsIdResponse401, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$DeleteV1VideoProjectsIdResponse401
 */
const SchemaOut$DeleteV1VideoProjectsIdResponse401: z.ZodType<
  External$DeleteV1VideoProjectsIdResponse401, // output type of this zod object
  z.ZodTypeDef,
  DeleteV1VideoProjectsIdResponse401 // the object to be transformed
> = z
  .object({
    message: z.enum(["Unauthorized"]),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      message: "message",
    });
  });

export const Schemas$DeleteV1VideoProjectsIdResponse401 = {
  in: SchemaIn$DeleteV1VideoProjectsIdResponse401,
  out: SchemaOut$DeleteV1VideoProjectsIdResponse401,
};
