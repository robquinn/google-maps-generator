import { describe, expect, it } from '@jest/globals'
import getMapNames from '../../../../src/ts/map/get-map-names'

describe('map/getMapNames', () => {
  it('should return an array of strings', () => {
    expect(typeof getMapNames).toBe('object')
    expect([...new Set(getMapNames.map((num) => typeof num))]).toEqual([
      'string',
    ])
  })
})
