"use client"

import { CSSProperties } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

import "./style.css"
import geoShape from "./shape.json"
import twConfig from "../../tailwind.config"
import type { Map as MapType } from "payload/generated-types"

// ####
// #### Variables
// ####

const colors = twConfig.theme.extend.colors

// ####
// #### Types
// ####

type CoordinatesType = {
  lat: number
  lng: number
}

type Props = {
  map: MapType
  className?: string | null | undefined
  style?: CSSProperties
}

// ####
// #### Component
// ####

const Map = ({ map, className, style }: Props) => {
  return (
    <ComposableMap
      projection="geoAlbersUsa"
      className={
        "bg-accent w-full max-w-7xl aspect-[2] md:aspect-[3] " + className
      }
      style={style}
    >
      <Geographies geography={geoShape} className="">
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#fff"
                stroke={colors?.accent}
              />
            )
          })
        }
      </Geographies>
      {map.markers &&
        map.markers.map((marker) => {
          return (
            <Marker
              coordinates={[marker?.lon ?? 0, marker?.lat ?? 0]}
              key={marker?.label}
              className="relative"
            >
              <circle r={12} stroke="#000" fill={colors.highlight} />
            </Marker>
          )
        })}
    </ComposableMap>
  )
}

export default Map
