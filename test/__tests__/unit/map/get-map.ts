import { Map, initialize, mockInstances } from '@googlemaps/jest-mocks'
import { beforeEach, describe, expect, test } from '@jest/globals'
import getMap from '../../../../src/ts/map/get-map'

beforeEach(() => {
  initialize()
})

describe('map/getMap', () => {
  test('should return map', () => {
    const areasData = {
      areas: [
        {
          id: 'apache-cottages-1',
          name: 'Apache Cottages 1',
          popup: {
            lat: 33.84936,
            lng: -111.84344,
          },
          coords: [
            { lat: 33.8506833, lng: -111.8424769 },
            { lat: 33.8509506, lng: -111.8435712 },
            { lat: 33.8491597, lng: -111.8442793 },
            { lat: 33.8479835, lng: -111.8442686 },
            { lat: 33.8475736, lng: -111.8420262 },
            { lat: 33.8484825, lng: -111.8422623 },
            { lat: 33.8506833, lng: -111.8424769 },
          ],
        },
      ],
    }

    const mapData = {
      center: {
        zoom: 14,
        lat: 33.85399,
        lng: -111.86111,
      },
    }

    const mapE = document.createElement('div')

    const map = getMap({ mapE, data: { ...areasData, ...mapData } })

    const mapMocks = mockInstances.get(Map)

    expect(mapMocks).toHaveLength(1)
    expect(map).toBeInstanceOf(google.maps.Map)
  })
})
