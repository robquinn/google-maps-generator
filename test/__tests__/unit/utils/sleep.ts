import { describe, expect, test, jest } from '@jest/globals'
import * as sleep from '../../../../src/ts/utils/sleep'

describe('utils/sleep', () => {
  test('sleep called with correct arguments and returns', async () => {
    const time = 1000
    const sleepSpy = jest.spyOn(sleep, 'default')
    await sleep.default(time)
    expect(sleepSpy).toHaveBeenCalledWith(time)
    expect(sleepSpy).toHaveBeenCalled()
    expect(sleepSpy).toHaveReturned()
  })
})
