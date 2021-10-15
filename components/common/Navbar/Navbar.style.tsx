import { css, useTheme } from "@emotion/react"
import { SerializedStyles } from "@emotion/utils"
import tw from "twin.macro"

export const rootS = (): SerializedStyles => {
  return css`
    ${tw`flex flex-row md:py-6`}
  `
}

export const linkS = (): SerializedStyles => {
  return css`
    ${tw`text-accents-6 leading-6 font-medium transition`}

    &:hover {
      ${tw`text-accents-9`}
    }
  `
}

export const logoS = (): SerializedStyles => {
  return css`
    ${tw`text-2xl font-bold`}
  `
}
