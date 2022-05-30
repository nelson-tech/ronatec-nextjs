import { css } from "twin.macro"

const exoFonts = (fontsCDN: string) => {
  return css`
    @font-face {
      font-family: "Exo";
      src: local("Exo"),
        url("${fontsCDN}/Exo/Exo-VariableFont.woff2") format("woff2"),
        url("${fontsCDN}/Exo/Exo-VariableFont.woff") format("woff");
      font-weight: 1 999;
      font-display: optional;
    }
  `
}

export default exoFonts
