import { describe, expect, test } from '@jest/globals'
import trimSpaceBetweenWords from '../../../../src/ts/utils/trim-space-between-words'

describe('utils/sleep', () => {
  test('sleep called with correct arguments and returns', () => {
    const str = `
        Desert
            Mountain
      Map
    `
    const expected = 'Desert Mountain Map'
    const result = trimSpaceBetweenWords(str)
    expect(result).toBe(expected)
  })
})
