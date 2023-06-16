import mapsEnum from './maps-enum'

const getMapName = (mapNumber: number): Map.Name =>
  mapsEnum.get(mapNumber) as Map.Name

export default getMapName
