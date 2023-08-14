"use client"

import { useState } from "react"
import NextImage from "next/image"
import type { ImageProps } from "next/image"

type ImagePropsType = ImageProps

const Image = (props: ImagePropsType) => {
  const [loading, setLoading] = useState(true)

  return (
    <NextImage
      {...props}
      onLoadingComplete={(img) => {
        setLoading(false)
        // props.onLoadingComplete && props.onLoadingComplete(img)
      }}
      className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity ${
        props.className ? props.className : ""
      }`}
    />
  )
}

export default Image
