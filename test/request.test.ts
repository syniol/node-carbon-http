import HydroHTTP from '../src/hydro'
import { HttpResponse } from '../src/http'

describe('Request Test', () => {
  let sut: HydroHTTP

  beforeAll(() => {
    sut = new HydroHTTP()
  })

  it('should be instantiable', () => {
    expect(sut).toBeInstanceOf(HydroHTTP)
  })

  describe('given GET request is made', () => {
    let actual: HttpResponse;

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
