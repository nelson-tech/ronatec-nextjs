import { css } from "@emotion/react"
import styled from "@emotion/styled"

type UnderlinedProps = {
  colorHex?: string
}

export const Underlined = styled.span<UnderlinedProps>`
  border-bottom-width: 0;
  background-image: linear-gradient(transparent, transparent),
    linear-gradient(#fff, #fff);
  background-size: 0 2px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.5s ease-in-out;

  background-image: linear-gradient(transparent, transparent),
    linear-gradient(
      ${props => `#${props.colorHex || "32de8a"}`},
      ${props => `#${props.colorHex || "32de8a"}`}
    );
`

export const underSelect = css`
  &:hover {
    .target {
      background-size: 100% 2px;
      background-position: 0 100%;
    }
    .icon {
      color: white;
    }
  }
`
export const padding16x9 = css`
  padding-top: 56.25%;
`
