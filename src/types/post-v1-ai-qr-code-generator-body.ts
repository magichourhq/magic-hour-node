/**
 * Generated by Sideko (sideko.dev)
 **/

import { types } from "magic-hour";

export type PostV1AiQrCodeGeneratorBody = {
  /**
   * The content of the QR code.
   */
  content: string;
  /**
   * The name of image
   */
  name?: string | null;
  style: types.PostV1AiQrCodeGeneratorBodyStyle;
};
