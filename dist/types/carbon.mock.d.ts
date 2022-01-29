import { HttpStatusCode, NodeRequestClient } from './http';
export default class CarbonHTTPMock {
    readonly client: NodeRequestClient;
    constructor(arg: string | Error, statusCode?: HttpStatusCode);
}
//# sourceMappingURL=carbon.mock.d.ts.map