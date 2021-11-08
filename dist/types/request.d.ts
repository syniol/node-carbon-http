import { HttpStatusCodes } from './codes';
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
export interface HttpRequestContext {
    [key: string]: any;
    headers?: any;
    method?: HttpMethod;
    body?: string;
    port?: number;
}
export interface HttpResponse {
    status: HttpStatusCodes;
    text(): string;
    json(): any;
}
export declare function Request(url: string, context?: HttpRequestContext): Promise<HttpResponse>;
