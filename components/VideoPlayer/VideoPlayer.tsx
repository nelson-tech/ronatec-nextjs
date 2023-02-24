"use client"

import ReactPlayer, { Config } from "react-player"

import type { Page_PageHome_Acf_VideoLinks_VideoLink } from "@api/codegen/graphql"

// ####
// #### Types
// ####

export type VideoPlayerPropsType = {
  source?: string
  rounded?: boolean
  light?: boolean
  divStyle?: string
  videoLink: Page_PageHome_Acf_VideoLinks_VideoLink
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
  const { videoId, videoUrl, provider, videoFile } = videoLink

  const url =
    provider === "youtube"
      ? `https://www.youtube.com/watch?v=${videoId}`
      : videoUrl
      ? videoUrl
      : undefined

  const config: Config = {}

  if (videoFile?.mediaItemUrl) {
    config.file = {
      attributes: { ...videoFile.mediaDetails },
      forceVideo: true,
    }
  }

  return (
    <div
      className={`relative max-h-96 w-full ${
        provider === "youtube" ? "aspect-video" : "aspect-[9/16]"
      } h-full ${rounded && "overflow-hidden rounded"} ${divStyle}`}
    >
      <ReactPlayer
        className="absolute top-0 left-0 h-full w-full"
        light={light}
        controls={provider !== "youtube"}
        width="100%"
        height="100%"
        url={url}
        config={config}
      />
    </div>
  )
}

export default VideoPlayer
