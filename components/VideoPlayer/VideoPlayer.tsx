import { SerializedStyles } from "@emotion/react"
import { TwStyle } from "twin.macro"
import ReactPlayer from "react-player"

import { Post_Common_VideoLink } from "@api/gql/types"

export type VideoPlayerPropsType = {
  source?: string
  rounded?: boolean
  light?: boolean
  divStyle?: SerializedStyles | TwStyle
  videoLink: Post_Common_VideoLink
}

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
      }`}
      css={[divStyle]}
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