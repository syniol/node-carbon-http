import { Request, CarbonHttpResponse } from '../src'


describe('Request Test', () => {
  const sut = Request

  describe('given GET request is made', () => {
    let actual: CarbonHttpResponse<any>;

    beforeAll(async () => {
      actual = await sut(
        'https://api.github.com/users/syniol',
        {
          headers: {
            'User-Agent': 'PostmanRuntime/7.26.5',
            'Accept': 'application/json',
          }
        }
      )
    })

    it('should bring a response back in JSON format', () => {
      expect(actual.json()).toMatchSnapshot({
        node_id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    })

    it('should bring a response back in String format', () => {
      expect(actual.text()).toContain('"login":"syniol"')
    })

    it('should bring a response back in String format', () => {
      expect(actual.headers).toMatchObject(expect.objectContaining({
        'content-length': expect.any(String),
      }))
    })
  })
})
