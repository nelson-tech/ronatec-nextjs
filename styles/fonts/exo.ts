import { css } from "twin.macro"

const exoFonts = (fontsCDN: string) => {
  return css`
    @font-face {
      font-family: "Exo";
      src: local("Exo"),
        url("${fontsCDN}/Exo/Exo-VariableFont_wght.ttf")
          format("truetype-variations");
      font-weight: 1 999;
      font-display: swap;
    }
  `
}

export default exoFonts
