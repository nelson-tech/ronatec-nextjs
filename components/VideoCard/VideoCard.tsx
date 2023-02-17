import VideoPlayer from "@components/VideoPlayer"
import { Page_PageHome_Acf_VideoLinks_VideoLink } from "@api/codegen/graphql"

// ####
// #### Types
// ####

export type VideoCardPropsType = {
  rounded?: boolean
  light?: boolean
  cardStyle?: string
  titleStyle?: string
  playerStyle?: string
  videoLink: Page_PageHome_Acf_VideoLinks_VideoLink
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
  const { title, videoUrl, videoId } = videoLink
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
