import checkMap from './check-map'
import getMapName from './get-map-name'
import getMapsArr from './get-maps-arr'

const mapsAreLoaded = (interval: NodeJS.Timer, init: () => void): void => {
  const mapsLoaded = []
  const mapNumbers = getMapsArr()
  const mapNames: Map.Name[] = mapNumbers.map((mapNum) => getMapName(mapNum))

  for (let i = 0; i < mapNames.length; i += 1)
    mapsLoaded.push(checkMap(mapNames[i]))

  if (mapsLoaded.includes(false)) {
    console.log('Running init to load maps.')
    init()
  } else {
    clearInterval(interval)
    console.log('Interval cleared. Maps loaded.')
  }
}

export default mapsAreLoaded
