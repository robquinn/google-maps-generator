/**
 * Creates a control that recenters the map on Chicago.
 */
const createCenterControl = (): HTMLElement => {
  const controlButton = document.createElement('div')
  const controlText = document.createElement('div')
  controlText.setAttribute('id', 'text')
  controlButton.append(controlText)

  // set CSS for the control text.
  controlText.textContent = 'Search Areas'
  controlText.style.color = '#fff'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.opacity = '1'

  // Set CSS for the control button.
  controlButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  controlButton.style.width = '250px'
  controlButton.style.border = '1px solid #fff'
  controlButton.style.borderRadius = '3px'
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlButton.style.cursor = 'pointer'
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlButton.style.fontSize = '16px'
  controlButton.style.lineHeight = '38px'
  controlButton.style.margin = '8px 0 22px'
  controlButton.style.padding = '0 5px'
  controlButton.style.textAlign = 'center'

  controlButton.title = 'Click to recenter the map'

  return controlButton
}

export default createCenterControl
