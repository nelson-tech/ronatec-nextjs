import { FC } from "react"
import tw from "twin.macro"
import s from "./ProductSlider.module.css"

const ProductSlider: FC = ({ children }) => {
  return (
    <div className={s.root}>
      <div css={tw`h-full transition-opacity`}>{children}</div>
    </div>
  )
}

export default ProductSlider
