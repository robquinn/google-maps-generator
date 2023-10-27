import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import { exec, type ChildProcess } from 'child_process'
import * as dotenv from 'dotenv'
import { type Page } from 'puppeteer'
import kill from 'tree-kill'
import _ from 'lodash'
import trimSpaceBetweenWords from '../../src/ts/utils/trim-space-between-words'
import mapsEnum from '../../src/ts/map/maps-enum'
import getMapsArr from '../../src/ts/map/get-maps-arr'

dotenv.config({ path: '../.env' })

jest.setTimeout(180000)

const webpackDevServerReady = async (process: ChildProcess): Promise<void> => {
  console.log('Waiting for Webpack Dev Server to finish loading...')
  await new Promise<void>((resolve) => {
    process.stdout?.on('data', (data: string | string[]) => {
      if (data.includes('GOOGLE MAPS GENERATOR')) {
        resolve()
      }
    })
  })
}

describe(`Local setup`, () => {
  let page: Page
  let devServerProcess: ChildProcess

  beforeAll(async () => {
    devServerProcess = exec('npm run serve')
    // eslint-disable-next-line no-underscore-dangle
    page = await global.__BROWSER_GLOBAL__.newPage()

    // const browser = await puppeteer.launch()
    // page = await browser.newPage()

    await page.setViewport({
      width: 900,
      height: 900,
      deviceScaleFactor: 1,
    })

    await webpackDevServerReady(devServerProcess)
    await page.goto(process.env.DEV_SERVER as string)
    await page.waitForTimeout(3000)
  })

  afterAll(() => {
    console.log('Closing processes.')
    const processes = [devServerProcess]
    processes.forEach((p: ChildProcess) => {
      kill(p.pid as number, 'SIGKILL')
    })
  })

  it('should load map title', async () => {
    const mapsArr = getMapsArr()
    const mapNames = mapsArr.map(
      (mapNumber: number) =>
        `${_.startCase(mapsEnum.get(mapNumber) as string)} Map`
    )
    const titleSelector = 'h2'
    const titlesRaw = await page.evaluate((sel) => {
      const elements = Array.from(document.querySelectorAll(sel))
      const headers = elements.map((element) => {
        return element.textContent
      })
      return headers
    }, titleSelector)
    const titles = titlesRaw.map((title: string | null) => {
      return trimSpaceBetweenWords(title as string)
    })
    expect(titles).toEqual(mapNames)
  })
  it('should load map', async () => {
    const mapsArr = getMapsArr()
    for (let i = 0; i < mapsArr.length; i += 1) {
      const mapSelector = `#${mapsEnum.get(mapsArr[i]) as string}-map`
      // eslint-disable-next-line no-await-in-loop
      const container = await page.$(mapSelector)
      // eslint-disable-next-line no-await-in-loop
      const value = await page.evaluate(
        (el) => el?.childNodes.length,
        container
      )
      expect((value != null ? value : 0) > 0).toBeTruthy()
    }
  })
})
