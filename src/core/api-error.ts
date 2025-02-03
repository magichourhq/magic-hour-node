import { RequestConfig } from "./core-client";

export class ApiError extends Error {
  request: RequestConfig;
  response: Response;

  constructor(request: RequestConfig, response: Response) {
    super(
      `${response.status} was returned from ${request.method} ${request.path}`,
    );
    this.request = request;
    this.response = response;
  }
}
