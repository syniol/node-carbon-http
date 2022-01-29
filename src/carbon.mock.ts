import { HttpStatusCode, NodeRequestClient } from './http'
import { Buffer } from 'buffer'
import { ClientRequest, IncomingMessage as InSecureIncomingMessage } from 'http'


export default class CarbonHTTPMock {
  public readonly client: NodeRequestClient

  public constructor(arg: string | Error, statusCode?: HttpStatusCode) {
    this.client = (_, callback) => {
      if (typeof callback === 'function') {
        const res = (<unknown>{
          on: (e: 'data' | 'error' | 'end', listener: (data?: any) => {}) => {
            switch (e) {
              case 'data':
                if (typeof arg === 'string') {
                  listener(Buffer.from(arg, 'utf8'))
                }
                break
              case 'error':
                if (arg instanceof Error) {
                  listener(arg)
                }
                break
              default:
                listener()
            }

            return this
          },
          statusCode:
            statusCode ||
            (
              arg instanceof Error
              ? HttpStatusCode.BAD_REQUEST
              : HttpStatusCode.OK
            ),
        }) as InSecureIncomingMessage

        callback(res)
      }

      return (<unknown>{
        write: () => true,
        end: () => undefined,
      }) as ClientRequest
    }
  }
}
