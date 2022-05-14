import { css } from "twin.macro"

import exoFonts from "./exo"

const fonts = (fontsCDN: string) => {
  return css`
    ${exoFonts(fontsCDN)}
  `
}

export default fonts
