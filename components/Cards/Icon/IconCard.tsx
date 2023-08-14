"use client"

import parseNewLines from "@utils/parseNewLines"

import Icon from "@components/ui/Icon"
import { Card } from "payload/generated-types"

// ####
// #### Types
// ####

export type PropsType = {
  card: Card[0]
  centerText?: boolean
  contentStyle?: string
}

// ####
// #### Component
// ####

const IconCard = ({ card, centerText = true, contentStyle }: PropsType) => {
  return (
    <div
      className={`flow-root bg-gray-50 rounded px-6 pb-8 md:pt-0 h-full${
        centerText && " text-center"
      }`}
      data-testid="icon-card"
    >
      <div className="-mt-6">
        {card.icon && card.icon.name && (
          <div>
            <span className="inline-flex items-center justify-center p-3 bg-highlight rounded shadow-md">
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
          <span className={"mt-5 text-base text-gray-500 " + contentStyle}>
            {parseNewLines(card.content)}
          </span>
        )}
      </div>
    </div>
  )
}

export default IconCard
