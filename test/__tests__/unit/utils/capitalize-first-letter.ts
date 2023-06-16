import { describe, expect, it } from '@jest/globals'
import capitalizeFirstLetter from '../../../../src/ts/utils/capitalize-first-letter'

describe('utils/capitalizeFirstLetter', () => {
  it('should capitalize first letter of string', () => {
    expect(capitalizeFirstLetter('somestring')).toBe('Somestring')
  })
})
