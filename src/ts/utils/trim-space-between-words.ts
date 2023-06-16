const trimSpaceBetweenWords = (str: string): string => {
  const arr = str.split(' ').filter((x) => x !== '')
  let finalText = ''

  arr.forEach((item: string) => {
    finalText = finalText.concat(`${item} `)
  })
  finalText = finalText.replace(/\n+/g, '')

  return finalText.trim()
}

export default trimSpaceBetweenWords
