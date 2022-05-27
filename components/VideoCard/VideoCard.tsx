import { SerializedStyles } from "@emotion/react"
import { TwStyle } from "twin.macro"

import { Post_Common_VideoLink } from "@api/gql/types"

import VideoPlayer from "@components/VideoPlayer"

// ####
// #### Types
// ####

export type VideoCardPropsType = {
  rounded?: boolean
  light?: boolean
  cardStyle?: SerializedStyles | TwStyle
  titleStyle?: SerializedStyles | TwStyle
  playerStyle?: SerializedStyles | TwStyle
  videoLink: Post_Common_VideoLink
}

// ####
// #### Component
// ####

const VideoCard = ({
  rounded = true,
  light = true,
  cardStyle,
  titleStyle,
  playerStyle,
  videoLink,
}: VideoCardPropsType) => {
  const { title, videoUrl, videoId, provider } = videoLink
  if (videoId || videoUrl) {
    return (
      <div className="w-full h-full" css={cardStyle}>
        {/* Title */}
        {title && (
          <div
            className="text-center pb-4 text-2xl divide-y-4 divide-gray-150 divide-double relative px-6"
            css={titleStyle}
          >
            <h2 className="pb-2">{title}</h2>
            <div></div>
          </div>
        )}
        <VideoPlayer
          videoLink={videoLink}
          divStyle={playerStyle}
          rounded={rounded}
          light={light}
        />
      </div>
    )
  }
  return <div>Error</div>
}

export default VideoCard
