const getMap = ({ mapE, data }: Map.Handler): google.maps.Map => {
  const mapElement: HTMLElement = mapE

  return new google.maps.Map(mapElement, {
    zoom: data.center.zoom,
    center: { lat: data.center.lat, lng: data.center.lng },
    mapTypeId: 'terrain',
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
  })
}

export default getMap
