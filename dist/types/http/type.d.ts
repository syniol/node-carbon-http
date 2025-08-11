/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { ClientRequest, IncomingMessage as InSecureIncomingMessage, RequestOptions as InSecureRequestOpt } from 'node:http';
import { RequestOptions as SecureRequestOpt } from 'node:https';
import { URL } from 'node:url';
import { HttpStatusCode } from './codes';
export type NodeRequestClient = (options: InSecureRequestOpt | SecureRequestOpt | string | URL, callback?: (res: InSecureIncomingMessage) => void) => ClientRequest;
export interface NodeRequestOption {
    path?: string;
    hostname?: string;
    host?: string;
    headers?: Record<string, string>;
    method?: HttpMethod;
    body?: string | Uint8Array;
    port?: number | string;
}
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    HEAD = "HEAD",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE"
}
export declare enum HttpProtocol {
    SecureHTTP = "https:",
    InSecureHTTP = "http:"
}
export interface CarbonHttpRequestOption {
    headers?: Record<string, string>;
    method?: HttpMethod;
    body?: string;
    port?: number;
}
export interface CarbonHttpResponse<T> {
    status: HttpStatusCode;
    headers: NodeJS.Dict<string | string[]>;
    text(): string;
    json(): T;
}
//# sourceMappingURL=type.d.ts.map