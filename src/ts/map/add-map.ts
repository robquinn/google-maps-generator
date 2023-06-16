const addMap = (mapName: string, maps: Map.Handler[]): void => {
  let areas: Map.Areas
  let info: Map.Info
  const mapE = document.getElementById(`${mapName}-map`)
  import(`../../data/${mapName}/areas.json`)
    .then(async (a: Map.Areas) => {
      areas = a
      return (await import(`../../data/${mapName}/map.json`)) as Map.Info
    })
    .then((i: Map.Info) => {
      info = i
      if (mapE != null) {
        maps.push({ mapE, data: { ...areas, ...info } })
      }
      return true
    })
    .catch((err) => {
      console.log('addMap ERROR', err)
    })
}

export default addMap
