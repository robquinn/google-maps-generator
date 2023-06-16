import { describe, expect, it } from '@jest/globals'
import getMapsArr from '../../../../src/ts/map/get-maps-arr'

describe('map/getMapsArr', () => {
  it('should return maps array', () => {
    const mapsArr = getMapsArr()
    expect(typeof mapsArr).toBe('object')
    expect([...new Set(mapsArr.map((num) => typeof num))]).toEqual(['number'])
  })
})
