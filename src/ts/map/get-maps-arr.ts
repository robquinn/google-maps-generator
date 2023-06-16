import mapStrArrToNumArr from '../utils/map-str-arr-to-num-arr'

const getMapsArr = (): number[] => {
  const mapNumbers = process.env.MAP_NUMBERS as string
  if (mapNumbers.includes(',')) {
    return mapStrArrToNumArr(mapNumbers.split(','))
  }
  return mapStrArrToNumArr([mapNumbers])
}

export default getMapsArr
