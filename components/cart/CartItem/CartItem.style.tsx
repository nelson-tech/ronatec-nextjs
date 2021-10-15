import { css, useTheme } from "@emotion/react"
import { SerializedStyles } from "@emotion/utils"
import tw from "twin.macro"

interface itemStyleProps {
  hasItem: boolean
}

export const itemS = ({ hasItem }: itemStyleProps): SerializedStyles => {
  return css`
    display: flex;
    flex-direction: row;
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem /** 32px */ * var(--tw-space-x-reverse));
    margin-left: calc(2rem /** 32px */ * calc(1 - var(--tw-space-x-reverse)));
    padding-top: 2rem /** 32px */;
    padding-bottom: 2rem /** 32px */;
    ${hasItem ? tw`opacity-75 pointer-events-none` : ``}
  `
}

export const imageContainerS = (): SerializedStyles => {
  const t = useTheme()

  return css`
    width: 4rem /** 64px */;
    height: 4rem /** 64px */;
    background-color: ${t.colors.electric};
    position: relative;
    overflow: hidden;
    cursor: pointer;
  `
}

export const productImageS = (): SerializedStyles => {
  return css`
    position: absolute;
    transform: scale(1.9);
    width: 100%;
    height: 100%;
    left: 30% !important;
    top: 30% !important;
  `
}

export const linkContainerS = (): SerializedStyles => {
  return css`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    font-size: 1rem /** 16px */;
    line-height: 1.5rem /** 24px */;
  `
}

export const quantityStyle = (): SerializedStyles => {
  const t = useTheme()

  return css`
    width: 2rem;
    border-color: ${t.colors["accents-2"]};

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0px;
    }
  `
}
