const mapsEnum: Map<number, Map.Name> = (process.env.MAPS as string)
  .split(',')
  .reduce((acc, val, idx, self) => {
    acc.set(parseInt(val.split(':')[1], 10), val.split(':')[0])
    return acc
  }, new Map()) as Map<number, Map.Name>

export default mapsEnum
