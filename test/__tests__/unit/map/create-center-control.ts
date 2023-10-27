import { describe, expect, it } from '@jest/globals'
import createCenterControl from '../../../../src/ts/map/create-center-control'

describe('map/createCenterControl', () => {
  it('should replace polygonColor', () => {
    const centerControl = createCenterControl()
    expect(centerControl).toBeInstanceOf(HTMLElement)
    expect(centerControl.querySelector('div')).toBeInstanceOf(HTMLElement)
    expect(
      (centerControl.querySelector('div') as HTMLElement).getAttribute('id')
    ).toBe('text')
  })
})
