import { describe, expect, test } from '@jest/globals'
import mapStrArrToNumArr from '../../../../src/ts/utils/map-str-arr-to-num-arr'

describe('utils/mapStrArrToNumArr', () => {
  test('returns an array of numbers given an array of strings', () => {
    const arrayOfStrings = ['1', '2', '3', '4']
    const expectedArray = mapStrArrToNumArr(arrayOfStrings)

    expect(typeof expectedArray[0]).toBe('number')
    expect(typeof expectedArray[1]).toBe('number')
    expect(typeof expectedArray[2]).toBe('number')
    expect(typeof expectedArray[3]).toBe('number')
  })
})
