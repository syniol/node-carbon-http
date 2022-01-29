import { NodeRequestClient, CarbonHttpRequestOption, CarbonHttpResponse } from './http';
export default class CarbonHTTP {
    #private;
    constructor(client?: NodeRequestClient);
    private response;
    request(url: Readonly<string>, opt?: CarbonHttpRequestOption): Promise<Readonly<CarbonHttpResponse>>;
}
//# sourceMappingURL=carbon.d.ts.map