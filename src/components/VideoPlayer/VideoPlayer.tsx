"use client"

import { VideoLink } from "~payload-types"
import type { JSXElementConstructor, ReactElement } from "react"
import ReactPlayer, { Config } from "react-player"

// ####
// #### Types
// ####

export type VideoPlayerPropsType = {
  source?: string
  rounded?: boolean
  light?:
    | string
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined
  divStyle?: string
  videoLink: VideoLink[0]
}
// ####
// #### Component
// ####

const VideoPlayer = ({
  videoLink,
  rounded = true,
  divStyle,
  light = true,
}: VideoPlayerPropsType) => {
  const { url, provider, video, videoId } = videoLink

  const videoURL =
    provider === "youtube"
      ? `https://www.youtube.com/watch?v=${videoId}`
      : provider === "other"
      ? url
      : typeof video === "object"
      ? video.url
      : undefined

  const config: Config = {}

  if (typeof video === "object") {
    config.file = {
      attributes: { ...video },
      forceVideo: true,
    }
  }

  return (
    <div
      className={`relative max-h-96 w-full aspect-video 
      h-full ${rounded && "overflow-hidden rounded"} ${divStyle}`}
    >
      <ReactPlayer
        className="absolute top-0 left-0 h-full w-full"
        light={light}
        controls={provider !== "youtube"}
        width="100%"
        height="100%"
        url={videoURL}
        config={config}
      />
    </div>
  )
}

export default VideoPlayer
