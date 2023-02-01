"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

import "./style.css"
import geoShape from "./shape.json"
import allStates from "./states.json"

import twConfig from "../../tailwind.config"
import {
  Maybe,
  Post_Maps_MapOptions,
  Post_Maps_Markers,
} from "@api/codegen/graphql"

// ####
// #### Variables
// ####

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
}

const colors = twConfig.theme.extend.colors

const CENTER_US = { lat: 39.5, lng: -98.35 }

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
  return (
    <>
      <ComposableMap
        projection="geoAlbersUsa"
        className={"bg-accent " + containerClassNames}
      >
        <Geographies geography={geoShape} className="">
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#fff"
                  stroke={colors.accent}
                />
              )
            })
          }
        </Geographies>
        {markers &&
          markers.map(marker => {
            return (
              <Marker
                coordinates={[
                  marker?.center?.lng ?? 0,
                  marker?.center?.lat ?? 0,
                ]}
                key={marker?.label}
                className="relative"
              >
                <circle r={12} stroke="#000" fill={colors.highlight} />
                {/* <text textAnchor="middle" fill="#F53" className="m-4 bg-accent">
                  {marker?.label}
                </text> */}
              </Marker>
            )
          })}
      </ComposableMap>
    </>
  )
}

export default Map
