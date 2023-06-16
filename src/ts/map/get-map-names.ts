import mapsEnum from './maps-enum'

const getMapNames: Map.Name[] = [...mapsEnum.entries()]
  .filter(([k, v]) => k > 0)
  .map((i) => i[1])

export default getMapNames
