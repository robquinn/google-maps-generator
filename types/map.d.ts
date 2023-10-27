declare namespace Map {
  type Name = 'desert-moutain' | 'north-scottsdale' | 'combined' | 'the-valley'
  interface Area {
    id: string
    name: string
    styles?: {
      zIndex?: number
    }
    popup: {
      lat: number
      lng: number
    }
    coords: google.maps.LatLngLiteral[]
  }

  interface Areas {
    areas: Area[]
  }

  interface Info {
    center: {
      zoom: number
      lat: number
      lng: number
    }
  }

  interface Data extends Info, Areas {}

  interface Handler {
    mapE: HTMLElement
    data: Data
  }
}
