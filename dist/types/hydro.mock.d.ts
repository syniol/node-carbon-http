import { HttpStatusCode, RequestType } from './http';
export default class HydroHTTPMock {
    readonly client: RequestType;
    constructor(arg: string | Error, statusCode?: HttpStatusCode);
}
