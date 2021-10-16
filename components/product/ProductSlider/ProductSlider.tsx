import React, { FC, Children, isValidElement, useState } from "react"
import tw from "twin.macro"
import { useKeenSlider } from "keen-slider/react"
import s from "./ProductSlider.module.css"
import cn from "classnames"

const ProductSlider: FC = ({ children }) => {
  const [currentState, setCurrentState] = useState(0)

  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentState(s.details().relativeSlide)
    },
  })

  return (
    <div className={s.root}>
      <div
        ref={sliderRef as React.RefObject<HTMLDivElement>}
        css={tw`h-full transition-opacity`}
        className="keen-slider"
      >
        <button
          onClick={slider?.prev}
          className={cn(s.leftControl, s.control)}
        />
        {Children.map(children, child => {
          if (isValidElement(child)) {
            return React.cloneElement(child, {
              className: `${
                child.props.className ? `${child.props.className} ` : ""
              }keen-slider__slide`,
            })
          }

          return child
        })}
        <button
          onClick={slider?.next}
          className={cn(s.rightControl, s.control)}
        />
      </div>
    </div>
  )
}

export default ProductSlider
