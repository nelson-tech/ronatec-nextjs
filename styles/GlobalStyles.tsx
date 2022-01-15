import React from "react"
import { css, Global } from "@emotion/react"
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro"

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
    -webkit-tap-highlight-color: ${theme`colors.blue.main`};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .font-family {
      font-family: Montserrat, sans-serif;
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

  .responsivePadding {
    padding-top: 52.25%;
    // medium
    @media (min-width: 768px) {
      padding-top: 40%;
    }
    // large
    @media (min-width: 1024px) {
      padding-top: 32.5%;
    }
  }

  .responsivePadding-thin {
    padding-top: 47%;
    // medium
    @media (min-width: 768px) {
      padding-top: 15%;
    }
    // large
    @media (min-width: 1024px) {
      padding-top: 15%;
    }
  }

  .padding16x9 {
    padding-top: 56.25%;
  }

  .danger {
    ul {
      list-style: inside disc;
      margin-left: 1rem /** 16px */;
      font-size: 0.875rem /** 14px */;
      line-height: 1.25rem /** 20px */;
      ${tw`text-base`}
    }
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
