import { describe, expect, it, jest } from '@jest/globals'
import * as addMap from '../../../../src/ts/map/add-map'
import * as getMapName from '../../../../src/ts/map/get-map-name'
import * as getMapsArr from '../../../../src/ts/map/get-maps-arr'
import initAddMap from '../../../../src/ts/map/init-add-map'
import sleep from '../../../../src/ts/utils/sleep'
import documentBodyHtml from '../../../utils/document-body-html'

describe('map/initAddMap', () => {
  it('should call "getMapsArr" & "getMapName" & "addMap" as well as add the maps to the map array', async () => {
    document.body.innerHTML = documentBodyHtml
    const getMapsArrSpy = jest.spyOn(getMapsArr, 'default')
    const getMapNameSpy = jest.spyOn(getMapName, 'default')
    const addMapSpy = jest.spyOn(addMap, 'default')

    const maps: Map.Handler[] = []

    initAddMap(maps)

    await sleep(1000)

    expect(getMapsArrSpy).toHaveBeenCalled()
    expect(getMapNameSpy).toHaveBeenCalled()
    expect(addMapSpy).toHaveBeenCalled()

    expect(maps.length > 0).toBeTruthy()
  })
})
