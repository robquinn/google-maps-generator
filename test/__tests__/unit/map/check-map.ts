import { describe, expect, it } from '@jest/globals'
import documentBodyHtml from '../../../utils/document-body-html'

describe('map/checkMap', () => {
  it('should return a boolean if map exists', async () => {
    document.body.innerHTML = documentBodyHtml

    const checkMap = await import('../../../../src/ts/map/check-map')

    expect(checkMap.default('north-scottsdale')).toBeTruthy()
    expect(checkMap.default('the-valley')).toBeTruthy()
    expect(checkMap.default('desert-mountain')).toBeTruthy()
    expect(checkMap.default('fountain-hills')).toBeTruthy()
    expect(checkMap.default('a-non-existant-map')).toBeFalsy()
  })
})
