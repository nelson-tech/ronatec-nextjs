"use client"

import { SVGUrl } from "@lib/utils/SVGURL"
import { Maybe } from "@api/codegen/graphql"

// ####
// #### Variables
// ####

const ICON_DEFAULT_STYLE = "regular"

const ICON_BASE = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons`

// ####
// #### Types
// ####

export type PropsType = {
  name: string
  type?: Maybe<string>
  className?: string
  ariaHidden?: boolean
  iconStyling?: string
  iconKey: string
}

// ####
// #### Component
// ####

const Icon = ({
  name,
  type = ICON_DEFAULT_STYLE,
  className,
  ariaHidden = true,
  iconStyling,
  iconKey,
}: PropsType) => {
  let iconType: string
  const types = ["brands", "duotone", "light", "regular", "solid"]
  if (type && types.includes(type)) {
    iconType = type
  } else {
    iconType = ICON_DEFAULT_STYLE
  }
  const uri = `${ICON_BASE}/${iconType}/${name}.svg`

  const { svgEl } = SVGUrl({ uri, iconKey })

  return (
    <div className={className + " transition icon"} data-testid="icon">
      <span className={`fill-current ${iconStyling}`} aria-hidden={ariaHidden}>
        {svgEl}
      </span>
    </div>
  )
}

export default Icon
