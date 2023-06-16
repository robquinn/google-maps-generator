import { describe, expect, it } from '@jest/globals'
import sleep from '../../../../src/ts/utils/sleep'
import documentBodyHtml from '../../../utils/document-body-html'

describe('map/addMap', () => {
  it('should add map to maps array', async () => {
    document.body.innerHTML = documentBodyHtml
    const maps: Map.Handler[] = []
    const mapName = 'desert-mountain'

    const addMap = await import('../../../../src/ts/map/add-map')

    addMap.default(mapName, maps)

    await sleep(1000)

    expect(maps).toHaveLength(1)
    expect(maps[0].mapE).toBeInstanceOf(HTMLElement)
  })
})
