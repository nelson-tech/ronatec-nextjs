import tw, { styled } from "twin.macro"

export const StyledContainer = styled.div<{
  type: "info" | "warning" | "error" | "success"
}>`
  ${props =>
    props.type === "info" || props.type === "success"
      ? tw`bg-green-50 border-green-main text-green-600`
      : props.type === "error"
      ? tw`bg-red-100 border-red-main text-red-main`
      : props.type === "warning"
      ? tw`bg-yellow-100 border-yellow-600 text-yellow-800`
      : ""}
`
