/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

/**
 * Success
 */
export type GetV1ImageProjectsIdResponse = {
  created_at: string;
  downloads: types.GetV1ImageProjectsIdResponseDownloadsItem[];
  /**
   * Unique ID of the image. This value can be used in the [get image project API](/api/tag/image-projects/get/v1/image-projects/{id}) to fetch additional details such as status
   */
  id: string;
  /**
   * Number of images generated
   */
  image_count: number;
  /**
   * The name of the image.
   */
  name?: string | null;
  /**
   * The status of the image.
   */
  status: types.GetV1ImageProjectsIdResponseStatusEnum;
  /**
   * The amount of frames used to generate the image.
   */
  total_frame_cost: number;
  type: types.GetV1ImageProjectsIdResponseTypeEnum;
};
