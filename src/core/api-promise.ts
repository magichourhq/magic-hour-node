import * as z from "zod";
import { ApiResponse } from "./core-client";
import { BinaryResponse } from "./binary-response";
import { JSON_PATTERN, TEXT_PATTERN } from "./content-type";

export interface ApiPromiseProps {
  responsePromise: Promise<ApiResponse>;
  responseStream: boolean;
  responseRaw: boolean;
  responseSchema?: z.Schema | undefined;
}

export type EventSourceResponse<T> = AsyncIterableIterator<T>;

export class ApiPromise<T>
  extends Promise<T>
  implements AsyncIterator<T>, AsyncIterable<T>
{
  constructor(private responseProps: ApiPromiseProps) {
    super((resolve) => {
      resolve(null as any);
    });
  }

  /**
   * Gets the raw response as returned by `fetch` rather than automatically
   * parsing the response.
   */
  async asResponse(): Promise<ApiResponse> {
    return await this.responseProps.responsePromise;
  }

  private getResponseType(contentType: string): "json" | "text" | "binary" {
    if (JSON_PATTERN.test(contentType)) {
      return "json";
    } else if (TEXT_PATTERN.test(contentType)) {
      return "text";
    } else {
      return "binary";
    }
  }

  private async parseResponse(): Promise<T> {
    const { responsePromise, responseSchema, responseRaw } = this.responseProps;
    const response = await responsePromise;

    if (response.status === 204) {
      return null as unknown as T;
    } else if (responseRaw) {
      return response as unknown as T;
    }

    const contentType = response.headers.get("content-type") ?? "";
    switch (this.getResponseType(contentType)) {
      case "json":
        const rawJson = await response.json();
        return responseSchema ? responseSchema.parse(rawJson) : rawJson;
      case "text":
        return (await response.text()) as unknown as T;
      case "binary":
      default:
        return new BinaryResponse(
          await response.blob(),
          contentType,
        ) as unknown as T;
    }
  }

  private async *handleNodeStream(
    stream: NodeJS.ReadableStream,
  ): AsyncIterableIterator<T> {
    const { responseSchema } = this.responseProps;
    const parser = new EventSourceParser();

    for await (const chunk of stream) {
      const text = chunk.toString();
      const messages = parser.parse(text);

      for (const message of messages) {
        if (message.data) {
          const rawJson = { data: JSON.parse(message.data) };
          yield responseSchema ? responseSchema.parse(rawJson) : rawJson;
        }
      }
    }
  }

  private async *handleWebStream(
    stream: ReadableStream<Uint8Array>,
  ): AsyncIterableIterator<T> {
    const { responseSchema } = this.responseProps;
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    const parser = new EventSourceParser();

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const messages = parser.parse(chunk);

        for (const message of messages) {
          if (message.data) {
            const rawJson = { data: JSON.parse(message.data) };
            yield responseSchema ? responseSchema.parse(rawJson) : rawJson;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async *asEventStream(): AsyncIterableIterator<T> {
    const { responsePromise, responseStream } = this.responseProps;

    if (!responseStream) {
      throw new Error("Response is not an event stream");
    }

    const response = await responsePromise;

    if (!response.body) {
      throw new Error("Response body is undefined");
    }

    // Check if we're in Node.js environment
    if ("pipe" in response.body && typeof response.body.pipe === "function") {
      yield* this.handleNodeStream(response.body);
    } else {
      yield* this.handleWebStream(response.body as ReadableStream<Uint8Array>);
    }
  }

  async next(): Promise<IteratorResult<T>> {
    const { responseStream } = this.responseProps;

    if (responseStream) {
      const iterator = this.asEventStream();
      const result = await iterator.next();
      return result;
    }

    const value = await this.parseResponse();
    return { value, done: true };
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    const iterator = {
      next: async (): Promise<IteratorResult<T>> => {
        const { responseStream } = this.responseProps;

        if (responseStream) {
          const stream = this.asEventStream();
          return stream.next();
        }

        const value = await this.parseResponse();
        return { value, done: true };
      },
    };

    return iterator;
  }

  override then<Result1 = T, Result2 = never>(
    onfulfilled?:
      | ((value: T) => Result1 | PromiseLike<Result1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => Result2 | PromiseLike<Result2>)
      | undefined
      | null,
  ): Promise<Result1 | Result2> {
    if (this.responseProps.responseStream) {
      return Promise.resolve(this.asEventStream() as unknown as Result1);
    }
    return this.parseResponse().then(onfulfilled, onrejected);
  }

  override catch<Result = never>(
    onrejected?:
      | ((reason: any) => Result | PromiseLike<Result>)
      | undefined
      | null,
  ): Promise<T | Result> {
    return this.parseResponse().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | undefined | null): Promise<T> {
    return this.parseResponse().finally(onfinally);
  }
}

interface SSEMessage {
  event: string | undefined;
  data: string;
  id: string | undefined;
}

class EventSourceParser {
  private buffer: string = "";

  parse(chunk: string): SSEMessage[] {
    this.buffer += chunk;
    const messages: SSEMessage[] = [];
    const lines = this.buffer.split("\n");

    // Keep the last line in buffer if it's not complete
    this.buffer = lines.pop() || "";

    let currentMessage: {
      event?: string | undefined;
      data?: string;
      id?: string | undefined;
    } = {};

    for (const line of lines) {
      if (line.trim() === "") {
        if (currentMessage.data) {
          const message: SSEMessage = {
            event: currentMessage.event,
            data: currentMessage.data,
            id: currentMessage.id,
          };
          messages.push(message);
        }
        currentMessage = {};
        continue;
      }

      const [fieldName, ...fieldValue] = line.split(":");
      const value = fieldValue.join(":").trim();

      switch (fieldName) {
        case "event":
          currentMessage.event = value;
          break;
        case "data":
          currentMessage.data = currentMessage.data
            ? currentMessage.data + "\n" + value
            : value;
          break;
        case "id":
          currentMessage.id = value;
          break;
        case "retry":
          // Handle retry if needed
          break;
      }
    }

    return messages;
  }
}
