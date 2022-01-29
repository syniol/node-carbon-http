import CarbonHTTP from '../src/carbon'
import CarbonHTTPMock from '../src/carbon.mock'
import { HttpStatusCode } from '../src/http'

describe('Request Unit Test', () => {
  let sut: CarbonHTTP

  describe('given successful response been received through https', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new CarbonHTTP(
        new CarbonHTTPMock(
          JSON.stringify({
            username: 'hadi',
            lastLoginDate: '2021-09-12',
          }),
        ).client,
      )

      actual = await sut.request('https://api.syniol.com/v2/users/hadi')
    })

    it('should have status of OK `200`', () => {
      expect(actual.status).toEqual(HttpStatusCode.OK)
    })

    it('should have a valid expected JSON', () => {
      expect(actual.json()).toMatchObject({
        username: 'hadi',
        lastLoginDate: '2021-09-12',
      })
    })
  })

  describe('given successful response been received through http', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new CarbonHTTP(
        new CarbonHTTPMock(
          JSON.stringify({
            username: 'hadi',
            lastLoginDate: '2021-09-12',
          }),
        ).client,
      )

      actual = await sut.request('http://api.syniol.com/v2/users/hadi')
    })

    it('should have status of OK `200`', () => {
      expect(actual.status).toEqual(HttpStatusCode.OK)
    })

    it('should have a valid expected JSON', () => {
      expect(actual.json()).toMatchObject({
        username: 'hadi',
        lastLoginDate: '2021-09-12',
      })
    })
  })

  describe('given successful response been received through non-specified http(s) protocol', () => {
    beforeAll(() => {
      sut = new CarbonHTTP(
        new CarbonHTTPMock(
          JSON.stringify({
            username: 'hadi',
            lastLoginDate: '2021-09-12',
          }),
        ).client,
      )
    })

    it('should throw an error for an invalid URL',  () => {
      expect(() => sut.request('api.syniol.com/v2/users/hadi'))
        .rejects
        .toThrowError('Invalid URL: api.syniol.com/v2/users/hadi');
    })
  })

  describe('given unsuccessful response been received', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new CarbonHTTP(
        new CarbonHTTPMock('{}', HttpStatusCode.FORBIDDEN).client,
      )

      actual = await sut.request(
        'http://api.syniol.com/v2/users/hadi',
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    })

    it('should have status of FORBIDDEN `403`', () => {
      expect(actual.status).toEqual(HttpStatusCode.FORBIDDEN)
    })

    it('should have a valid expected JSON', () => {
      expect(actual.json()).toMatchObject({})
    })
  })

  describe('given an unknown response been received and without status code', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new CarbonHTTP(
        new CarbonHTTPMock('').client,
      )

      actual = await sut.request(
        'http://api.syniol.com/v2/users/hadi',
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
    })

    it('should have status of OK `200`', () => {
      expect(actual.status).toEqual(HttpStatusCode.OK)
    })
  })

  describe('given error been thrown during request', () => {
    beforeAll(async () => {
      sut = new CarbonHTTP(new CarbonHTTPMock(new Error('Unexpected')).client)
    })

    it('should throw an error', () => {
      expect(() =>
        sut.request('http://api.syniol.com/v2/users/hadi'),
      ).rejects.toThrow('Unexpected')
    })
  })
})
