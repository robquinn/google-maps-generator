const replacePolygonColor = (colorStr: string, amount: number): string => {
  const regex = /hsl\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*\)/g
  const thirdGroup = '$3'
  const lightness = parseInt(colorStr.replace(regex, `${thirdGroup}`), 10)
  return colorStr.replace(regex, `hsl($1, $2, ${lightness + amount}%)`)
}

export default replacePolygonColor
