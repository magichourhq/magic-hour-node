/**
 * The status of the audio.
 *
 * - `draft` - the project was created but has not been submitted for rendering
 * - `queued` - the job is waiting for an available server
 * - `rendering` - the job is being processed; the `audio.started` webhook event fires when rendering begins
 * - `complete` - the job finished successfully; fires `audio.completed`
 * - `error` - the job failed during processing; fires `audio.errored`
 * - `canceled` - the job was manually canceled (for example from the Magic Hour web app)
 *
 * **Note:** `rendering`, `complete`, and `error` have matching webhook events; `canceled` does not - a canceled job emits no webhook event, so poll this endpoint to detect cancellation.
 */
export type V1AudioProjectsGetResponseStatusEnum =
  | "canceled"
  | "complete"
  | "draft"
  | "error"
  | "queued"
  | "rendering";
