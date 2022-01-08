import { css } from "@emotion/react"
import styled from "@emotion/styled"
import tw from "twin.macro"

export const Container = styled.div<{ layout: "A" | "B" }>`
  & > * {
    ${tw`row-span-1 overflow-hidden`}
    max-height: 800px;

    @screen lg {
      height: inherit;
    }
  }
  ${props =>
    props.layout === "A"
      ? css`
          & > *:nth-child(6n + 1),
          & > *:nth-child(6n + 5) {
            @apply lg:col-span-2 lg:row-span-2;
          }
        `
      : css`
          & > *:nth-child(6n + 2),
          & > *:nth-child(6n + 6) {
            @apply lg:col-span-2 lg:row-span-2;
          }
        `}
  // Quick edits below
  ${tw`grid gap-0 grid-cols-1 lg:grid-cols-3 lg:grid-rows-2`}
`
