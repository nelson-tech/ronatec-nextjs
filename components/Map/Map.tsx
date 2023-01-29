"use client"

import { useCallback, useState } from "react"
import "./style.css"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

import twConfig from "../../tailwind.config"
import {
  Maybe,
  Post_Maps_MapOptions,
  Post_Maps_Markers,
} from "@api/codegen/graphql"
import useMobileDetect from "@lib/hooks/useMobileDetect"

import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Variables
// ####

const colors = twConfig.theme.extend.colors

const CENTER_US = { lat: 39.5, lng: -98.35 }

const DEFAULT_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: "water",
    stylers: [{ color: colors.blue.main, inverted_lightness: false }],
  },
  {
    featureType: "landscape",
    stylers: [{ color: "#fefefe", inverted_lightness: false }],
  },
  {
    featureType: "all",
    stylers: [{ gamma: 1 }],
  },
]

const DEFAULT_OPTIONS: google.maps.MapOptions = {
  mapTypeId: "roadmap",
  center: CENTER_US,
  styles: DEFAULT_STYLES,
  zoom: 4,
  disableDefaultUI: true,
  keyboardShortcuts: false,
  fullscreenControl: false,
}

// ####
// #### Types
// ####

type CoordinatesType = {
  lat: number
  lng: number
}

type Props = {
  center?: CoordinatesType
  options?: Post_Maps_MapOptions
  markers?: Maybe<Post_Maps_Markers>[] | null
  containerClassNames?: string
  markerLabels?: boolean
}

// ####
// #### Component
// ####

const Map = ({
  options,
  markers,
  markerLabels,
  containerClassNames,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
    preventGoogleFontsLoading: true,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isMobile } = useMobileDetect()

  const onLoad = useCallback((map: google.maps.Map) => {
    // const bounds = new window.google.maps.LatLngBounds()

    setMap(map)
  }, [])

  const onUnmount = useCallback((map: any) => {
    setMap(null)
  }, [])

  let mapOptions: google.maps.MapOptions = {}

  if (options) {
    mapOptions = {
      mapTypeId: options.mapType,
      zoom: isMobile ? (options.zoom || 4) - 1 : options.zoom,
      styles: options.mapTypeStyle?.map<google.maps.MapTypeStyle>(style => {
        let givenStyle: google.maps.MapTypeStyle = { stylers: [] }
        if (style?.featureType) {
          givenStyle.featureType = `${style.featureType}${
            style.featureTypeChild ? style.featureTypeChild : ""
          }`
        } else if (style?.elementType) {
          givenStyle.elementType = `${style.elementType}${
            style.elementTypeChild ? style.elementTypeChild : ""
          }`
        }
        if (style?.mapTypeStyleStylers) {
          givenStyle.stylers = style.mapTypeStyleStylers.map(styler => {
            let givenStyler: any = {}
            if (styler?.color) {
              givenStyler.color = `#${styler.color}`
            } else if (styler?.gamma) {
              givenStyler.gamma = styler.gamma
            } else if (styler?.saturation) {
              givenStyler.saturation = styler.gamma
            }
            return givenStyler
          })
        }
        return givenStyle
      }),
    }
    if (options.center && options.center.lat && options.center.lng) {
      mapOptions.center = { lat: options.center.lat, lng: options.center.lng }
    } else {
      mapOptions.center = DEFAULT_OPTIONS.center
    }
  } else {
    mapOptions = DEFAULT_OPTIONS
  }

  const markerLoad = (marker: google.maps.Marker) => {
    console.log("Marker: ", marker)
  }

  return (
    <div className="w-screen">
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={containerClassNames}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          id="google-map-script"
        >
          {markers &&
            markers.map(marker => {
              const markerCenter = marker!.center
              if (markerCenter && markerCenter.lat && markerCenter.lng) {
                const { lat, lng } = markerCenter

                const iconType = marker?.icon?.type ?? "regular"
                const iconName = marker?.icon?.name ?? "location-dot"

                return (
                  <Marker
                    position={{ lat, lng }}
                    label={
                      markerLabels == false
                        ? marker!.label || undefined
                        : undefined
                    }
                    onLoad={markerLoad}
                    icon={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons/${iconType}/${iconName}.svg`}
                    key={"map_marker" + marker?.label + (lat + lng)}
                  />
                )
              }
            })}
        </GoogleMap>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="aspect-2 md:aspect-3 w-full">
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner className="w-1/12" opacity={50} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Map
