const zoomControl = (div: HTMLDivElement, map: google.maps.Map): void => {
  const controlDiv = div
  // Creating divs & styles for custom zoom control
  controlDiv.style.padding = '5px'

  // Set CSS for the control wrapper
  const controlWrapper = document.createElement('div')
  controlWrapper.style.backgroundColor = 'white'
  controlWrapper.style.borderStyle = 'solid'
  controlWrapper.style.borderColor = 'gray'
  controlWrapper.style.borderWidth = '1px'
  controlWrapper.style.cursor = 'pointer'
  controlWrapper.style.textAlign = 'center'
  controlWrapper.style.width = '32px'
  controlWrapper.style.height = '64px'
  controlDiv.appendChild(controlWrapper)

  // Set CSS for the zoomIn
  const zoomInButton = document.createElement('div')
  zoomInButton.style.width = '32px'
  zoomInButton.style.height = '32px'
  /* Change this to be the .png image you want to use */
  zoomInButton.style.backgroundImage =
    'url("https://placester-assets.s3.amazonaws.com/img/plus-icon.png")'
  zoomInButton.style.backgroundRepeat = 'no-repeat'
  zoomInButton.style.backgroundPosition = 'center'

  controlWrapper.appendChild(zoomInButton)

  // Set CSS for the zoomOut
  const zoomOutButton = document.createElement('div')
  zoomOutButton.style.width = '32px'
  zoomOutButton.style.height = '32px'
  /* Change this to be the .png image you want to use */
  zoomOutButton.style.backgroundImage =
    'url("https://placester-assets.s3.amazonaws.com/img/minus-icon.png")'
  zoomOutButton.style.backgroundRepeat = 'no-repeat'
  zoomOutButton.style.backgroundPosition = 'center'

  controlWrapper.appendChild(zoomOutButton)

  // Setup the click event listener - zoomIn
  google.maps.event.addDomListener(zoomInButton, 'click', function () {
    map.setZoom((map.getZoom() as number) + 1)
  })

  // Setup the click event listener - zoomOut
  google.maps.event.addDomListener(zoomOutButton, 'click', function () {
    map.setZoom((map.getZoom() as number) - 1)
  })
}

export default zoomControl
