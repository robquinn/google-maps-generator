import { describe, expect, it } from '@jest/globals'
import getMapName from '../../../../src/ts/map/get-map-name'

describe('map/getMapName', () => {
  it('should return the map name given the map number', () => {
    expect(getMapName(1)).toBe('desert-mountain')
    expect(getMapName(2)).toBe('north-scottsdale')
    expect(getMapName(3)).toBe('the-valley')
    expect(getMapName(4)).toBe('fountain-hills')
  })
})
