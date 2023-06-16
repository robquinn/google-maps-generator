const getPolygonColors = (lengthOfData: number): string[] => {
  const hslColorWheelMax = 360
  const iterateBy = Math.floor(hslColorWheelMax / lengthOfData)

  const colors = []

  for (let i = 0; i < hslColorWheelMax; i += iterateBy) {
    colors.push(`hsl(${i}, 80%, 25%)`)
  }

  return colors
}

export default getPolygonColors
