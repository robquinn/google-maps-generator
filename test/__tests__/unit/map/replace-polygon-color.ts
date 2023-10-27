import { describe, expect, it } from '@jest/globals'
import replacePolygonColor from '../../../../src/ts/map/replace-polygon-color'

describe('map/replacePolygonColor', () => {
  it('should replace polygonColor', () => {
    const polygonColor = `hsl(100, 80%, 25%)`
    const newColor = replacePolygonColor(polygonColor, 40)
    expect(newColor).toBe(`hsl(100, 80%, 65%)`)
  })
})
