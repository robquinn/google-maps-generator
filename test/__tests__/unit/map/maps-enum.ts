import { describe, expect, it } from '@jest/globals'
import mapsEnum from '../../../../src/ts/map/maps-enum'

describe('map/mapsEnum', () => {
  it('should return maps enum', () => {
    expect(typeof mapsEnum).toBe('object')
    expect(mapsEnum.get(1)).toBe('desert-mountain')
    expect(mapsEnum.get(2)).toBe('north-scottsdale')
    expect(mapsEnum.get(3)).toBe('the-valley')
  })
})
