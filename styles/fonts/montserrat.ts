import { css } from "twin.macro"

const montserratFonts = (fontsCDN: string) => {
  return css`
    @font-face {
      font-family: "Montserrat";
      src: local("Monteserrat"),
        url("${fontsCDN}/Montserrat/Montserrat-VF.ttf")
          format("truetype-variations");
      font-weight: 1 999;
      /* font-display: swap; */
    }
  `
}

export default montserratFonts
