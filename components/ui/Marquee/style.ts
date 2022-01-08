import styled from "@emotion/styled"
import tw from "twin.macro"

export const Container = styled.div`
  // Quick edits below
  ${tw`max-h-4`}
`
export const StyledContent = styled.div`
  & > * {
    ${tw`flex-1 px-16 py-4`};
  }
  // Quick edits below
  ${tw`flex flex-row`}
`
