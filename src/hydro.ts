
import { URL } from 'url'
import { TextEncoder } from 'util'
import { request as InSecureRequest } from 'http'
import { request as SecureRequest } from 'https'

import {
  RequestType,
  HttpMethod,
  HttpRequestContext,
  HttpResponse,
  HttpStatusCode
} from './http'


export default class HydroHTTP {
  readonly #forcedClient: boolean;
  #client: RequestType

  public constructor(client?: RequestType) {
    this.#forcedClient = false;
    this.#client = InSecureRequest

    if (client) {
      this.#client = client
      this.#forcedClient = true;
    }
  }

  private response(
    dataBlocks: Uint8Array[],
    status: number
  ): Readonly<HttpResponse> {
    const result = Buffer.concat(dataBlocks).toString()

    return {
      status: status,
      json(): any {
        return JSON.parse(result)
      },
      text(): string {
        return result
      },
    }
  }

  public request(
    url: string,
    context?: HttpRequestContext,
  ): Promise<HttpResponse> {
    const urlObject = new URL(url)
    const opt = {
      method: context?.method || HttpMethod.GET,
      headers: context?.headers,
      path: `${urlObject.pathname}${urlObject.search || ''}`,
      body: new TextEncoder().encode(context?.body),
      port: context?.port ? context?.port : urlObject.port,
    }

    if (urlObject?.protocol === 'https:') {
      if (!this.#forcedClient) {
        this.#client = SecureRequest
      }

      Object.assign(opt, { hostname: urlObject.hostname })
    } else {
      Object.assign(opt, { host: urlObject.host })
    }

    return new Promise((resolve, reject) => {
      const req = this.#client(opt, (res) => {
        const dataCollection: Uint8Array[] = []
        res.on('data', (data: Uint8Array) => {
          dataCollection.push(data)
        })

        res.on('error', (err: any) => {
          reject(err)
        })

        res.on('end', () => {
          resolve(
            this.response(
              dataCollection,
              res?.statusCode || HttpStatusCode.OK
            ),
          )
        })
      })

      req.write(context?.body || '')

      req.end()
    })
  }
}
