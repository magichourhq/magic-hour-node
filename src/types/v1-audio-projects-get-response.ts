import { zodTransform } from "make-api-request-js";
import * as z from "zod";

import {
  External$V1AudioProjectsGetResponseDownloadsItem,
  Schemas$V1AudioProjectsGetResponseDownloadsItem,
  V1AudioProjectsGetResponseDownloadsItem,
} from "./v1-audio-projects-get-response-downloads-item";
import {
  External$V1AudioProjectsGetResponseError,
  Schemas$V1AudioProjectsGetResponseError,
  V1AudioProjectsGetResponseError,
} from "./v1-audio-projects-get-response-error";

/**
 * Success
 */
export type V1AudioProjectsGetResponse = {
  createdAt: string;
  /**
   * The amount of credits deducted from your account to generate the audio. We charge credits right when the request is made.
   *
   * If an error occurred while generating the audio, credits will be refunded and this field will be updated to include the refund.
   */
  creditsCharged: number;
  downloads: V1AudioProjectsGetResponseDownloadsItem[];
  /**
   * Whether this resource is active. If false, it is deleted.
   */
  enabled: boolean;
  /**
   * In the case of an error, this object will contain the error encountered during video render
   */
  error: V1AudioProjectsGetResponseError | null;
  /**
   * Unique ID of the audio. Use it with the [Get audio Project API](https://docs.magichour.ai/api-reference/audio-projects/get-audio-details) to fetch status and downloads.
   */
  id: string;
  /**
   * The name of the audio.
   */
  name: string | null;
  /**
   * The status of the audio.
   */
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  /**
   * The type of the audio project. Possible values are VOICE_GENERATOR, VOICE_CHANGER, VOICE_CLONER, VIDEO_TO_AUDIO
   */
  type: string;
};

/**
 * @internal
 * V1AudioProjectsGetResponse without any key transformation, this is what
 * we expect to come in as network data
 */
export type External$V1AudioProjectsGetResponse = {
  created_at: string;
  credits_charged: number;
  downloads: External$V1AudioProjectsGetResponseDownloadsItem[];
  enabled: boolean;
  error: External$V1AudioProjectsGetResponseError | null;
  id: string;
  name: string | null;
  status: "canceled" | "complete" | "draft" | "error" | "queued" | "rendering";
  type: string;
};

/**
 * Takes network data, validates it, and transforms keys to match typescript object V1AudioProjectsGetResponse
 */
const SchemaIn$V1AudioProjectsGetResponse: z.ZodType<
  V1AudioProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  unknown
> = z
  .object({
    created_at: z.string(),
    credits_charged: z.number().int(),
    downloads: z.array(Schemas$V1AudioProjectsGetResponseDownloadsItem.in),
    enabled: z.boolean(),
    error: Schemas$V1AudioProjectsGetResponseError.in.nullable(),
    id: z.string(),
    name: z.string().nullable(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    type: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      created_at: "createdAt",
      credits_charged: "creditsCharged",
      downloads: "downloads",
      enabled: "enabled",
      error: "error",
      id: "id",
      name: "name",
      status: "status",
      type: "type",
    });
  });

/**
 * @internal
 * Takes typescript data, validates it, and maps keys to match the expected external object External$V1AudioProjectsGetResponse
 */
const SchemaOut$V1AudioProjectsGetResponse: z.ZodType<
  External$V1AudioProjectsGetResponse, // output type of this zod object
  z.ZodTypeDef,
  V1AudioProjectsGetResponse // the object to be transformed
> = z
  .object({
    createdAt: z.string(),
    creditsCharged: z.number().int(),
    downloads: z.array(Schemas$V1AudioProjectsGetResponseDownloadsItem.out),
    enabled: z.boolean(),
    error: Schemas$V1AudioProjectsGetResponseError.out.nullable(),
    id: z.string(),
    name: z.string().nullable(),
    status: z.enum([
      "canceled",
      "complete",
      "draft",
      "error",
      "queued",
      "rendering",
    ]),
    type: z.string(),
  })
  .transform((obj) => {
    return zodTransform(obj, {
      createdAt: "created_at",
      creditsCharged: "credits_charged",
      downloads: "downloads",
      enabled: "enabled",
      error: "error",
      id: "id",
      name: "name",
      status: "status",
      type: "type",
    });
  });

export const Schemas$V1AudioProjectsGetResponse = {
  in: SchemaIn$V1AudioProjectsGetResponse,
  out: SchemaOut$V1AudioProjectsGetResponse,
};
