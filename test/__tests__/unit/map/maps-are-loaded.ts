import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
// import mapsAreLoaded from '../../../src/ts/map/maps-are-loaded'
import * as getMapsArr from '../../../../src/ts/map/get-maps-arr'
import * as checkMap from '../../../../src/ts/map/check-map'
import * as getMapName from '../../../../src/ts/map/get-map-name'
import documentBodyHtml from '../../../utils/document-body-html'

describe('map/mapsAreLoaded', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  it('should call "getMapsArr" & "checkMap" & the init function', async () => {
    jest.spyOn(global, 'clearInterval')

    const getMapsArrSpy = jest.spyOn(getMapsArr, 'default')
    const checkMapSpy = jest.spyOn(checkMap, 'default')
    const getMapNameSpy = jest.spyOn(getMapName, 'default')
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')

    const logSpy = jest.spyOn(console, 'log')

    const init = (): void => {
      document.body.innerHTML = documentBodyHtml
      console.log('init ran')
    }

    // const init = jest.fn()

    const mapsAreLoaded = await import('../../../../src/ts/map/maps-are-loaded')

    const interval = setInterval(() => {
      mapsAreLoaded.default(interval, init)
    }, 1000)

    jest.runAllTimers()
    expect(getMapsArrSpy).toHaveBeenCalled()
    expect(checkMapSpy).toHaveBeenCalled()
    expect(getMapNameSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('init ran')

    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(clearIntervalSpy).toHaveBeenCalledWith(interval)
  })
})
