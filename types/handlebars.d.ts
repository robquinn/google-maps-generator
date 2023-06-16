declare namespace Handlebars {
  interface Areas extends Record<Partial<Map.Name>, Map.Area[]> {}
  interface Data {
    areas: Areas
    maps: string[]
  }
}
