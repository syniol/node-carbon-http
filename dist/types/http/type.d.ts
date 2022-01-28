/// <reference types="node" />
import { ClientRequest, IncomingMessage as InSecureIncomingMessage, RequestOptions as InSecureRequestOpt } from 'http';
import { RequestOptions as SecureRequestOpt } from 'https';
import { URL } from 'url';
import { HttpStatusCode } from './codes';
export declare type RequestType = (options: InSecureRequestOpt | SecureRequestOpt | string | URL, callback?: (res: InSecureIncomingMessage) => void) => ClientRequest;
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
export interface HttpRequestContext {
    [key: string]: any;
    headers?: any;
    method?: HttpMethod;
    body?: string;
    port?: number;
}
export interface HttpResponse {
    status: HttpStatusCode;
    text(): string;
    json(): any;
}
