import { SVGUrl } from "@lib/utils/SVGURL"
import { LoadingDots } from "@components/ui"
import { Maybe, Post_Common_Icon } from "@api/gql/types"

const ICON_DEFAULT_STYLE = "regular"

export interface IconPropsType {
  name: string
  type?: Maybe<string>
  className?: string
  ariaHidden?: boolean
  iconStyling?: string
  iconKey?: string
}

const ICON_BASE = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/icons`

const Icon = ({
  name,
  type = ICON_DEFAULT_STYLE,
  className,
  ariaHidden = true,
  iconStyling,
  iconKey,
}: IconPropsType) => {
  let iconType: string
  const types = ["brands", "duotone", "light", "regular", "solid"]
  if (type && types.includes(type)) {
    iconType = type
  } else {
    iconType = ICON_DEFAULT_STYLE
  }
  const uri = `${ICON_BASE}/${iconType}/${name}.svg`

  const { loading, svgEl } = SVGUrl({ uri, iconKey })

  return (
    <div className={className + " transition icon"}>
      <span className={`fill-current ${iconStyling}`} aria-hidden={ariaHidden}>
        {svgEl}
      </span>
    </div>
  )
}

export default Icon
