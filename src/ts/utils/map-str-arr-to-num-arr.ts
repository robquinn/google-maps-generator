const mapStrArrToNumArr = (strArr: string[]): number[] =>
  strArr.map((numStr) => parseInt(numStr, 10))

export default mapStrArrToNumArr
