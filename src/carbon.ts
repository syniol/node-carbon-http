
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


function response(
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

export function Request(
  url: Readonly<string>,
  opt?: CarbonHttpRequestOption,
  clientService?: NodeRequestClient | any,
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

  let client = InSecureRequest;
  if (clientService) {
    client = clientService;
  }

  if (urlAPI.protocol === HttpProtocol.SecureHTTP) {
    if (!clientService) {
      client = SecureRequest
    }

    nodeReqOpt.hostname = urlAPI.hostname;
  } else {
    nodeReqOpt.host = urlAPI.host;
  }

  return new Promise((resolve, reject) => {
    const req = client(nodeReqOpt, (res) => {
      const dataCollection: Uint8Array[] = []
      res.on('data', (data: Uint8Array) => {
        dataCollection.push(data)
      })

      res.on('error', (err: any) => {
        reject(err)
      })

      res.on('end', () => {
        resolve(
          response(
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
