"use client"

import { Page_PageHome_Acf_VideoLink } from "@api/codegen/graphql"
import ReactPlayer from "react-player"

// ####
// #### Types
// ####

export type VideoPlayerPropsType = {
  source?: string
  rounded?: boolean
  light?: boolean
  divStyle?: string
  videoLink: Page_PageHome_Acf_VideoLink
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
  const { videoId, videoUrl, provider } = videoLink

  const url =
    provider === "youtube"
      ? `https://www.youtube.com/watch?v=${videoId}`
      : videoUrl
      ? videoUrl
      : undefined

  return (
    <div
      className={`relative w-full aspect-video h-full${
        rounded && " overflow-hidden rounded-lg"
      } ${divStyle}`}
    >
      <ReactPlayer
        className="absolute top-0 left-0 h-full w-full"
        light={light}
        width="100%"
        height="100%"
        url={url}
      />
    </div>
  )
}

export default VideoPlayer
