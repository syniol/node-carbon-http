import { RequestType, HttpRequestContext, HttpResponse } from './http';
export default class HydroHTTP {
    #private;
    constructor(client?: RequestType);
    private response;
    request(url: string, context?: HttpRequestContext): Promise<HttpResponse>;
    requestConcurrently(url: string, context?: HttpRequestContext): Promise<any>;
}
