import addMap from './add-map'
import getMapName from './get-map-name'
import getMapsArr from './get-maps-arr'

const initAddMap = (maps: Map.Handler[]): void => {
  const mapNumbers = getMapsArr()
  const mapNames: Map.Name[] = mapNumbers.map((mapNum) => getMapName(mapNum))
  for (let i = 0; i < mapNames.length; i += 1) {
    const mapName = mapNames[i]
    addMap(mapName, maps)
  }
}

export default initAddMap
