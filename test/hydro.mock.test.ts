import HydroHTTP from '../src/hydro'
import HydroHTTPMock from '../src/hydro.mock'
import { HttpStatusCode } from '../src/http'

describe('Request Unit Test', () => {
  let sut: HydroHTTP

  describe('given successful response been received', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new HydroHTTP(
        new HydroHTTPMock(
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

  describe('given unsuccessful response been received', () => {
    let actual: any = undefined

    beforeAll(async () => {
      sut = new HydroHTTP(
        new HydroHTTPMock('{}', HttpStatusCode.FORBIDDEN).client,
      )

      actual = await sut.request('http://api.syniol.com/v2/users/hadi')
    })

    it('should have status of OK `403`', () => {
      expect(actual.status).toEqual(HttpStatusCode.FORBIDDEN)
    })

    it('should have a valid expected JSON', () => {
      expect(actual.json()).toMatchObject({})
    })
  })

  describe('given error been thrown during request', () => {
    beforeAll(async () => {
      sut = new HydroHTTP(new HydroHTTPMock(new Error('Unexpected')).client)
    })

    it('should throw an error', () => {
      expect(() =>
        sut.request('http://api.syniol.com/v2/users/hadi'),
      ).rejects.toThrow('Unexpected')
    })
  })
})
