import styled from "@emotion/styled"
import tw from "twin.macro"

export const Container = styled.div`
  // Quick Edits Below
  ${tw`text-gray-700 w-full`}
`

export const TopContainer = styled.div`
  // Quick edits below
  ${tw`flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 my-8 mx-auto px-8 w-full`}
`

export const ProductTopContainer = styled.div`
  // Quick edits below
  ${tw`w-full h-full mx-auto`}
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
