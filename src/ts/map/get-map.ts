const getMap = ({ mapE, data }: Map.Handler): google.maps.Map => {
  const mapElement: HTMLElement = mapE

  return new google.maps.Map(mapElement, {
    zoom: data.center.zoom,
    center: { lat: data.center.lat, lng: data.center.lng },
    mapTypeId: 'terrain',
    zoomControl: false,
    mapTypeControl: true,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  })
}

export default getMap
