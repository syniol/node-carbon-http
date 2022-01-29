import { HttpStatusCode, RequestType } from './http';
export default class CarbonHTTPMock {
    readonly client: RequestType;
    constructor(arg: string | Error, statusCode?: HttpStatusCode);
}
//# sourceMappingURL=carbon.mock.d.ts.map