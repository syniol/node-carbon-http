
import { URL } from 'node:url'
import { TextEncoder } from 'node:util'
import { request as InSecureRequest } from 'node:http'
import { request as SecureRequest } from 'node:https'

import {
  NodeRequestClient,
  NodeRequestOption,
  CarbonHttpRequestOption,
  CarbonHttpResponse,
  HttpStatusCode,
  HttpMethod,
  HttpProtocol,
} from './http'
import { NewCarbonError } from './error'


function response<T>(
  dataBlocks: Uint8Array[],
  status: Readonly<number>,
  headers: NodeJS.Dict<string | string[]>,
): Readonly<CarbonHttpResponse<T>> {
  const result: Readonly<string> = Buffer
    .concat(dataBlocks)
    .toString()

  return {
    status: status,
    headers: headers,
    json(): T {
      try {
        return JSON.parse(result)
      } catch (_) {
        throw NewCarbonError(
          'error parsing response as a valid JSON object',
          `actual response: ${this.text()}`,
          status,
        )
      }
    },
    text(): string {
      return result
    },
  }
}

export function Request<T>(
  url: Readonly<string>,
  opt?: CarbonHttpRequestOption,
  clientService?: NodeRequestClient | any,
): Promise<Readonly<CarbonHttpResponse<T>>> {
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
            res.statusCode || HttpStatusCode.OK,
            res.headers,
          ),
        )
      })
    })

    req.write(opt?.body || '')

    req.end()
  })
}
