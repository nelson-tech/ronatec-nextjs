import { SerializedStyles } from "@emotion/react"
import { TwStyle } from "twin.macro"

import { parseNewLines } from "@lib/utils"
import { Post_Common_Cards } from "@api/gql/types"
import Icon from "@components/ui/Icon"

// ####
// #### Dynamic Imports
// ####

const clientOpts = {}

// ####
// #### Types
// ####

export type IconCardPropsType = {
  card: Post_Common_Cards
  centerText?: boolean
  contentStyle?: SerializedStyles | TwStyle
}

// ####
// #### Component
// ####

const IconCard = ({
  card,
  centerText = true,
  contentStyle,
}: IconCardPropsType) => {
  return (
    <div
      className={`flow-root bg-gray-50 rounded-lg px-6 pb-8 md:pt-0 h-full${
        centerText && " text-center"
      }`}
    >
      <div className="-mt-6">
        {card.icon && card.icon.name && (
          <div>
            <span className="inline-flex items-center justify-center p-3 bg-green-main rounded-md shadow-md">
              <Icon
                name={card.icon.name}
                className="h-6 w-6 text-white"
                type={card.icon.type}
                iconKey={"iconCard" + card.title + card.icon.name}
              />
            </span>
          </div>
        )}
        {card.title && (
          <h3 className="mt-8 text-lg font-medium text-blue-dark tracking-tight">
            {card.title}
          </h3>
        )}
        {card.content && (
          <span className="mt-5 text-base text-gray-500" css={contentStyle}>
            {parseNewLines(card.content)}
          </span>
        )}
      </div>
    </div>
  )
}

export default IconCard
