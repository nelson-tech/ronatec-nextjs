import { iconFragment } from "."

export const centerFragment = `
center {
  lat
  lng
}`

export const markersFragment = `
markers {
  label
  ${centerFragment}
  ${iconFragment}
}
`

export const mapTypeStyleStylersFragment = `
mapTypeStyleStylers {
  color
  gamma
  saturation
}
`

export const mapTypeStyleFragment = `
mapTypeStyle {
  featureType
  featureTypeChild
  elementTypeChild
  ${mapTypeStyleStylersFragment}
}
`

export const mapOptionsFragment = `
mapOptions {
  mapType
  ${mapTypeStyleFragment}
  ${centerFragment}
  zoom
  defaultUi
  keyboardShortcuts
}
`

export const mapFragment = `
map {
  ${mapOptionsFragment}
  ${markersFragment}
}
`
