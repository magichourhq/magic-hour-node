/**
 * The status of the video.
 *
 * - `draft` - the project was created but has not been submitted for rendering
 * - `queued` - the job is waiting for an available server
 * - `rendering` - the job is being processed; the `video.started` webhook event fires when rendering begins
 * - `complete` - the job finished successfully; fires `video.completed`
 * - `error` - the job failed during processing; fires `video.errored`
 * - `canceled` - the job was manually canceled (for example from the Magic Hour web app)
 *
 * **Note:** `rendering`, `complete`, and `error` have matching webhook events; `canceled` does not - a canceled job emits no webhook event, so poll this endpoint to detect cancellation.
 */
export type V1VideoProjectsGetResponseStatusEnum =
  | "canceled"
  | "complete"
  | "draft"
  | "error"
  | "queued"
  | "rendering";
