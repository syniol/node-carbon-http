import { NodeRequestClient, CarbonHttpRequestOption, CarbonHttpResponse } from './http';
export default class CarbonHTTP {
    #private;
    constructor(client?: NodeRequestClient);
    private response;
    request(url: string, context?: CarbonHttpRequestOption): Promise<CarbonHttpResponse>;
}
//# sourceMappingURL=carbon.d.ts.map