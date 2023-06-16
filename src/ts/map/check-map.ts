const checkMap = (mapName: string): boolean => {
  const mapE = document.getElementById(`${mapName}-map`)
  if (mapE != null && mapE.childNodes.length > 0) return true
  return false
}

export default checkMap
