import '../scss/index.scss'
import createCenterControl from './map/create-center-control'

import getMap from './map/get-map'
import getPolygonColors from './map/get-polygon-colors'
import initAddMap from './map/init-add-map'
import mapsAreLoaded from './map/maps-are-loaded'
import replacePolygonColor from './map/replace-polygon-color'
import zoomControl from './map/zoom-control'

const maps: Map.Handler[] = []

initAddMap(maps)

const initGoogleMapsApi = (): void => {
  let map: google.maps.Map
  let popup
  const controlButton: HTMLElement = createCenterControl()
  const controlText = controlButton.querySelector('#text') as HTMLElement
  // let infoWindow: google.maps.InfoWindow

  maps.forEach(({ mapE, data }: { mapE: HTMLElement; data: Map.Data }) => {
    const latLngBounds = new google.maps.LatLngBounds()

    map = getMap({ mapE, data })

    const colors = getPolygonColors(data.areas.length)

    data.areas.forEach((area: Map.Area, index: number) => {
      const areaPolygon = new google.maps.Polygon({
        paths: area.coords,
        strokeColor: colors[index],
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: colors[index],
        fillOpacity: 0.35,
      })

      if (
        Object.prototype.hasOwnProperty.call(area, 'styles') &&
        Object.prototype.hasOwnProperty.call(area.styles, 'zIndex')
      ) {
        areaPolygon.setOptions({ zIndex: area?.styles?.zIndex })
      }

      areaPolygon.setMap(map)

      areaPolygon.addListener('mouseover', () => {
        controlText.textContent = area.name
        areaPolygon.setOptions({
          fillColor: replacePolygonColor(colors[index], 40),
        })
      })
      areaPolygon.addListener('mouseout', () => {
        controlText.textContent = 'Search Areas'
        areaPolygon.setOptions({
          fillColor: colors[index],
        })
      })

      area.coords.forEach((coord: google.maps.LatLngLiteral) => {
        latLngBounds.extend(coord)
      })

      google.maps.event.addListener(areaPolygon, 'click', () => {
        const url = `${window.location.origin}/area/${area.id}`
        window.location.href = url
      })

      // const marker = new google.maps.Marker({
      //   position: { lat: area.popup.lat, lng: area.popup.lng },
      //   map,
      //   icon: '../res/img/empty.png',
      //   label: {
      //     color: '#000000',
      //     fontWeight: 'bold',
      //     className: 'stroke-overlay-text',
      //     text: area.name,
      //     fontSize: '10px',
      //   },
      // })
      // marker.setMap(map)

      // infoWindow = new google.maps.InfoWindow()
      class Popup extends google.maps.OverlayView {
        position
        containerDiv
        constructor(
          position: google.maps.LatLngLiteral | google.maps.LatLng,
          content: HTMLElement
        ) {
          super()
          this.position = position
          content.classList.add('popup-bubble')

          // This zero-height div is positioned at the bottom of the bubble.
          const bubbleAnchor = document.createElement('div')

          bubbleAnchor.classList.add('popup-bubble-anchor')
          bubbleAnchor.appendChild(content)
          // This zero-height div is positioned at the bottom of the tip.
          this.containerDiv = document.createElement('div')
          this.containerDiv.classList.add('popup-container')
          this.containerDiv.appendChild(bubbleAnchor)
          // Optionally stop clicks, etc., from bubbling up to the map.
          Popup.preventMapHitsAndGesturesFrom(this.containerDiv)
        }

        /** Called when the popup is added to the map. */
        onAdd(): void {
          this.getPanes()?.floatPane.appendChild(this.containerDiv)
        }

        /** Called when the popup is removed from the map. */
        onRemove(): void {
          if (this.containerDiv.parentElement != null) {
            this.containerDiv.parentElement.removeChild(this.containerDiv)
          }
        }

        /** Called each frame when the popup needs to draw itself. */
        draw(): void {
          const divPosition = this.getProjection().fromLatLngToDivPixel(
            this.position
          )
          // Hide the popup when it is far out of view.
          const display =
            Math.abs(divPosition?.x as number) < 4000 &&
            Math.abs(divPosition?.y as number) < 4000
              ? 'block'
              : 'none'

          if (display === 'block') {
            this.containerDiv.style.left = `${divPosition?.x as number}px`
            this.containerDiv.style.top = `${divPosition?.y as number}px`
          }

          if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display
          }
        }
      }

      const areaElement = document.getElementById(area.id)

      if (areaElement != null) {
        popup = new Popup(
          new google.maps.LatLng(area.popup.lat, area.popup.lng),
          document.getElementById(area.id) as HTMLElement
        )
        popup.setMap(map)
      }
    })
    map.fitBounds(latLngBounds, 0)

    // Create the DIV to hold the control.
    const centerControlDiv = document.createElement('div')
    // Create the control.
    const centerControl = controlButton
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl)

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv)

    // Create the DIV to hold the control and call the ZoomControl() constructor
    // passing in this DIV.
    const zoomControlDiv = document.createElement('div')
    zoomControl(zoomControlDiv, map)

    // zoomControlDiv.index = 1
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv)
  })
}

window.initGoogleMapsApi = initGoogleMapsApi

window.addEventListener('load', () => {
  const interval = setInterval(() => {
    mapsAreLoaded(interval, initGoogleMapsApi)
  }, 1000)
})
