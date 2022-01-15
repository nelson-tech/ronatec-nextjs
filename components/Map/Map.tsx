import { useCallback, useEffect, useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { LoadingDots } from "@components/ui"
import twConfig from "../../tailwind.config"
import { css } from "@emotion/react"
import { Maybe, Post_Maps_MapOptions, Post_Maps_Markers } from "@api/gql/types"
import { useMobileDetect } from "@lib/hooks"

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
}

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

const Map = ({
  options,
  markers,
  markerLabels,
  containerClassNames,
}: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isMobile, isDesktop, isSSR } = useMobileDetect()

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds()

    setMap(map)
  }, [])

  console.log("SSR", isSSR())
  console.log("Desktop", isDesktop())

  const onUnmount = useCallback(map => {}, [])

  let mapOptions: google.maps.MapOptions = {}

  if (options) {
    mapOptions = {
      mapTypeId: options.mapType,
      zoom: isMobile() ? (options.zoom || 4) - 1 : options.zoom,
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

  return (
    <div
      className="w-screen -ml-5"
      css={css`
        .gmnoprint {
          visibility: hidden;
        }
        .gm-style div a img {
          visibility: hidden;
        }
      `}
    >
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName={containerClassNames}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers &&
            markers.map(marker => {
              const markerCenter = marker!.center
              if (markerCenter && markerCenter.lat && markerCenter.lng) {
                const { lat, lng } = markerCenter

                return (
                  <Marker
                    position={{ lat, lng }}
                    label={
                      markerLabels == false
                        ? marker!.label || undefined
                        : undefined
                    }
                    icon={
                      marker!.icon
                        ? marker!.icon.name
                          ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons/${
                              marker!.icon.type
                            }/${marker!.icon.name}.svg`
                          : undefined
                        : undefined
                    }
                    key={"map_marker" + marker!.label + (lat + lng)}
                  />
                )
              }
            })}
        </GoogleMap>
      ) : (
        <LoadingDots />
      )}
    </div>
  )
}

export default Map

{
  /* <img
        css={css`
          width: 256px;
          height: 256px;
          -webkit-user-select: none;
          border: 0px;
          padding: 0px;
          margin: 0px;
          max-width: none;
        `}
        draggable="false"
        alt=""
        role="presentation"
        src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i4!2i2!3i6!4i256!2m3!1e0!2sm!3i585311270!3m17!2sen!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcC5oOiM4MWQ3NDJ8cC5sOjEwfHAuczozMCxzLnQ6M3xzLmU6Z3xwLnY6c2ltcGxpZmllZCxzLnQ6M3xzLmU6bA!4e0!5m1!5f2&amp;key=AIzaSyBpfR6rYtbHQRyZeDbvQPTJ_gAIv_dkedY&amp;token=30809"
        className="__WebInspectorHideElement__"
      ></img> */
}
