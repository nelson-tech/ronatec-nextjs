// import { Post_Common_VideoLink } from "@api/codegen/graphql"

import VideoPlayer from "@components/VideoPlayer"
import { GetHomeDataQuery } from "@api/codegen/graphql"

// ####
// #### Types
// ####

export type VideoCardPropsType = {
  rounded?: boolean
  light?: boolean
  cardStyle?: string
  titleStyle?: string
  playerStyle?: string
  videoLink: DeepNull<
    GetHomeDataQuery,
    "page.page_home.acf.videoLink"
  >["page"]["page_home"]["acf"]["videoLink"]
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
      <div className={"w-full h-full " + cardStyle}>
        {/* Title */}
        {title && (
          <div
            className={
              "text-center pb-4 text-2xl divide-y-4 divide-gray-150 divide-double relative px-6 " +
              titleStyle
            }
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
