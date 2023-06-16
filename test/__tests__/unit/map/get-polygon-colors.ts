import { describe, expect, it } from '@jest/globals'
import getPolygonColors from '../../../../src/ts/map/get-polygon-colors'

describe('map/getPolygonColors', () => {
  it('should array of strings that are colors', () => {
    const colors = getPolygonColors(4)
    expect(colors).toHaveLength(4)
    expect(colors.map((c) => typeof c)).toEqual([
      'string',
      'string',
      'string',
      'string',
    ])
    expect(colors[0]).toMatch(/(hsl\([\d]+%?, [\d]+%?, [\d]+%?\))+/gm)
  })
})
