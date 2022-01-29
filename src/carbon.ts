
import { URL } from 'url'
import { TextEncoder } from 'util'
import { request as InSecureRequest } from 'http'
import { request as SecureRequest } from 'https'

import {
  NodeRequestClient,
  NodeRequestOption,
  CarbonHttpRequestOption,
  CarbonHttpResponse,
  HttpStatusCode,
  HttpMethod,
} from './http'


export default class CarbonHTTP {
  readonly #forcedClient: boolean;
  #client: NodeRequestClient

  public constructor(client?: NodeRequestClient) {
    this.#forcedClient = false;
    this.#client = InSecureRequest

    if (client) {
      this.#client = client
      this.#forcedClient = true;
    }
  }

  private response(
    dataBlocks: Uint8Array[],
    status: Readonly<number>
  ): Readonly<CarbonHttpResponse> {
    const result: Readonly<string> = Buffer
      .concat(dataBlocks)
      .toString()

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
    context?: CarbonHttpRequestOption,
  ): Promise<Readonly<CarbonHttpResponse>> {
    const urlObject = new URL(url)
    const opt: NodeRequestOption = {
      method: context?.method || HttpMethod.GET,
      path: `${urlObject.pathname}${urlObject.search || ''}`,
      body: new TextEncoder().encode(context?.body),
      port: context?.port ? context.port : urlObject.port,
    }

    if (context?.headers) {
      opt.headers = context.headers;
    }

    if (urlObject?.protocol === 'https:') {
      if (!this.#forcedClient) {
        this.#client = SecureRequest
      }

      opt.hostname = urlObject.hostname;
    } else {
      opt.host = urlObject.host;
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
