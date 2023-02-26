"use client"

import { CSSProperties } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps"

import { Maybe, Post_Maps_Markers } from "@api/codegen/graphql"

import "./style.css"
import geoShape from "./shape.json"
import twConfig from "../../tailwind.config"

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
  center?: CoordinatesType
  markers?: Maybe<Post_Maps_Markers>[] | null
  className?: string | null | undefined
  style?: CSSProperties
}

// ####
// #### Component
// ####

const Map = ({ markers, className, style }: Props) => {
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
                stroke={colors.accent}
              />
            )
          })
        }
      </Geographies>
      {markers &&
        markers.map((marker) => {
          return (
            <Marker
              coordinates={[marker?.center?.lng ?? 0, marker?.center?.lat ?? 0]}
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
