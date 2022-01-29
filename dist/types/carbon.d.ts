import { NodeRequestClient, CarbonHttpRequestOption, CarbonHttpResponse } from './http';
export declare class CarbonHTTP {
    private readonly forcedClient;
    private client;
    constructor(client?: NodeRequestClient);
    private response;
    request(url: Readonly<string>, opt?: CarbonHttpRequestOption): Promise<Readonly<CarbonHttpResponse>>;
}
//# sourceMappingURL=carbon.d.ts.map