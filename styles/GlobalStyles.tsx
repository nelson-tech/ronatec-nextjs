import React from "react"
import { css, Global } from "@emotion/react"

const fontsCDN = `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/fonts`
export const customStyles = css`
  @font-face {
    font-family: "Exo";
    src: url("${fontsCDN}/Exo/Exo-VariableFont_wght.ttf")
      format("truetype-variations");
    font-weight: 1 999;
  }

  @font-face {
    font-family: "Montserrat";
    src: url("${fontsCDN}/Montserrat/Montserrat-VF.ttf")
      format("truetype-variations");
    font-weight: 1 999;
  }

  body {
    -webkit-tap-highlight-color: #5375a0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .font-family {
      font-family: Montserrat, Verdana, sans-serif;
      font-display: swap;
    }
  }

  .progress-bar {
    @media (min-width: 768px) {
      height: 4px !important;
    }

    @media (min-width: 1024px) {
      height: 4px !important;
    }
  }

  .danger {
    ul {
      list-style: inside disc;
      margin-left: 1rem /** 16px */;
      font-size: 1rem /** 14px */;
      line-height: 1.25rem /** 20px */;
    }
  }

  .flip {
    transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
  }
`

const GlobalStyles = () => (
  <>
    {/* <BaseStyles /> */}
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
