import { RequestType, HttpRequestContext, HttpResponse } from './http';
export default class CarbonHTTP {
    #private;
    constructor(client?: RequestType);
    private response;
    request(url: string, context?: HttpRequestContext): Promise<HttpResponse>;
}
//# sourceMappingURL=carbon.d.ts.map