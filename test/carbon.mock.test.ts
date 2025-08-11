import {
  CarbonClientMock,
  HttpStatusCode,
  Request
} from '../src'


describe('Request Unit Test', () => {
  const sut = Request

  describe('given successful response been received through https', () => {
    let actual: any = undefined

    beforeAll(async () => {
      actual = await sut(
        'https://api.syniol.com/v2/users/hadi',
        undefined,
        CarbonClientMock(
          JSON.stringify({
            username: 'hadi',
            lastLoginDate: '2021-09-12',
          }),
        ),
      )
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
      actual = await sut(
        'http://api.syniol.com/v2/users/hadi',
        undefined,
        CarbonClientMock(
          JSON.stringify({
            username: 'hadi',
            lastLoginDate: '2021-09-12',
          }),
        ),
      )
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
    it('should throw an error for an invalid URL', async () => {
      try {
        await sut(
          'api.syniol.com/v2/users/hadi',
          undefined,
          CarbonClientMock(
            JSON.stringify({
              username: 'hadi',
              lastLoginDate: '2021-09-12',
            }),
          ),
        )
      } catch (e: any) {
        expect(e.message).toContain('Invalid URL')
      }
    })
  })

  describe('given unsuccessful response been received', () => {
    let actual: any = undefined

    beforeAll(async () => {
      actual = await sut(
        'http://api.syniol.com/v2/users/hadi',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
        CarbonClientMock('{}', HttpStatusCode.FORBIDDEN),
      )
    })

    it('should have status of FORBIDDEN `403`', () => {
      expect(actual.status).toEqual(HttpStatusCode.FORBIDDEN)
    })

    it('should have a valid expected JSON', () => {
      expect(actual.json()).toMatchObject({})
    })
  })

  describe('given error been thrown during request', () => {
    it('should throw an error', () => {
      expect(() =>
        sut(
          'http://api.syniol.com/v2/users/hadi',
          undefined,
          CarbonClientMock(new Error('Unexpected')),
        ),
      ).rejects.toThrow('Unexpected')
    })
  })

  describe('given response is not a valid JSON string, when `json()` called', () => {
    it('should throw an error', async () => {
      try {
        ;(
          await sut(
            'https://api.syniol.com/v2/users/hadi',
            undefined,
            CarbonClientMock('some text', HttpStatusCode.OK),
          )
        ).json()
      } catch (e: unknown) {
        expect(e).toMatchObject({
          code: HttpStatusCode.OK,
          message: 'error parsing response as a valid JSON object',
          name: 'Carbon HTTP(s) Error',
          stack: 'actual response: some text',
        })
      }
    })
  })
})
