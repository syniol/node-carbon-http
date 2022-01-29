
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
  HttpProtocol,
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

  public async request(
    url: Readonly<string>,
    opt?: CarbonHttpRequestOption,
  ): Promise<Readonly<CarbonHttpResponse>> {
    const urlAPI = new URL(url)
    const nodeReqOpt: NodeRequestOption = {
      method: opt?.method || HttpMethod.GET,
      path: `${urlAPI.pathname}${urlAPI.search || ''}`,
      body: new TextEncoder().encode(opt?.body),
      port: opt?.port ? opt.port : urlAPI.port,
    }

    if (opt?.headers) {
      nodeReqOpt.headers = opt.headers;
    }

    if (urlAPI.protocol === HttpProtocol.SecureHTTP) {
      if (!this.#forcedClient) {
        this.#client = SecureRequest
      }

      nodeReqOpt.hostname = urlAPI.hostname;
    } else {
      nodeReqOpt.host = urlAPI.host;
    }

    return new Promise((resolve, reject) => {
      const req = this.#client(nodeReqOpt, (res) => {
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
              res.statusCode || HttpStatusCode.OK
            ),
          )
        })
      })

      req.write(opt?.body || '')

      req.end()
    })
  }
}
