import { ClientRequestArgs, IncomingMessage } from 'node:http'

import { HttpStatusCode } from './codes'

export interface NodeRequestOption {
  path?: string
  hostname?: string
  host?: string
  headers?: Record<string, string>
  method?: HttpMethod
  body?: string | Uint8Array
  port?: number | string
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  CONNECT = "CONNECT",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
}

export enum HttpProtocol {
  SecureHTTP = "https:",
  InSecureHTTP = "http:",
}

export interface CarbonHttpRequestOption extends ClientRequestArgs {
  headers?: Record<string, string>;
  method?: HttpMethod;
  body?: string;
  port?: number;
}

export interface CarbonHttpResponse {
  status: HttpStatusCode;
  headers: NodeJS.Dict<string | string[]>;
  incomingMessage: IncomingMessage;

  text(): string;

  json<T>(): T;
}
