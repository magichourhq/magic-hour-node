/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type GetV1VideoProjectsIdResponse = {
  created_at: string;
  /**
   * The download url and expiration date of the video project
   */
  download?: types.GetV1VideoProjectsIdResponseDownload | null;
  /**
   * The end time of the input video in seconds
   */
  end_seconds: number;
  /**
   * Frame rate of the video. If the status is not &#x27;complete&#x27;, the frame rate is an estimate and will be adjusted when the video completes.
   */
  fps: number;
  /**
   * The height of the final output video. The maximum height depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  height: number;
  /**
   * Unique ID of the video. This value can be used in the [get video project API](/api/tag/video-projects/get/v1/video-projects/{id}) to fetch additional details such as status
   */
  id: string;
  /**
   * The name of the video.
   */
  name?: string | null;
  /**
   * The start time of the input video in seconds
   */
  start_seconds: number;
  /**
   * The status of the video.
   */
  status: types.GetV1VideoProjectsIdResponseStatusEnum;
  /**
   * The amount of frames used to generate the video. If the status is not &#x27;complete&#x27;, the cost is an estimate and will be adjusted when the video completes.
   */
  total_frame_cost: number;
  type: types.GetV1VideoProjectsIdResponseTypeEnum;
  /**
   * The width of the final output video. The maximum width depends on your subscription. Please refer to our [pricing page](https://magichour.ai/pricing) for more details
   */
  width: number;
};
