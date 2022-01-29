import CarbonHTTP from '../src/carbon'
import { CarbonHttpResponse } from '../src/http'

describe('Request Test', () => {
  let sut: CarbonHTTP

  beforeAll(() => {
    sut = new CarbonHTTP()
  })

  it('should be instantiable', () => {
    expect(sut).toBeInstanceOf(CarbonHTTP)
  })

  describe('given GET request is made', () => {
    let actual: CarbonHttpResponse;

    beforeAll(async () => {
      actual = await sut.request('https://api.genderize.io/?name=hadi')
    })

    it('should bring a response back in JSON format', () => {
      expect(actual.json()).toMatchSnapshot({
        probability: expect.any(Number),
        count: expect.any(Number),
      })
    })

    it('should bring a response back in String format', () => {
      expect(actual.text()).toContain('"name":"hadi","gender":"male"')
    })
  })
})
