import styled from "@emotion/styled"
import tw from "twin.macro"

export const Container = styled.div`
  // Quick Edits Below
  ${tw`container text-gray-700`}
`

export const TopContainer = styled.div`
  // Quick edits below
  ${tw`grid grid-cols-2 gap-16 my-8 mx-8`}
`

export const ProductTopContainer = styled.div`
  // Quick edits below
  ${tw`w-full h-full`}
`

export const ProductMainContainer = styled.div`
  /* & > .danger ul {
    ${tw`text-2xl ml-4`}
    li {
      ${tw`text-xs list-disc ml-4`}
    }
  } */
  // Quick edits below
  ${tw`mx-8 pt-8 pb-16`}
`
