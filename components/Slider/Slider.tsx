import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react"
import { SerializedStyles } from "@emotion/react"
import { TwStyle } from "twin.macro"

import { Maybe, Post_Common_Slides } from "@api/gql/types"

// ####
// #### Types
// ####

export type SliderPropsType = {
  slides: Maybe<Post_Common_Slides>[]
  sliderStyle?: (SerializedStyles | TwStyle)[]
  imageFit?: ImageProps["objectFit"]
  rounded?: boolean
  options?: KeenSliderOptions
  containerClassName?: string
}

const defaultOptions: KeenSliderOptions = {
  initial: 0,
  loop: true,
  mode: "free-snap",
}

// ####
// #### Component
// ####

const Slider = ({
  slides,
  sliderStyle,
  imageFit = "cover",
  rounded = false,
  options = defaultOptions,
  containerClassName,
}: SliderPropsType) => {
  const [currentSlid, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...options,
    slideChanged(s) {
      // console.log(s.options())
    },
    // slideChanged(slider) {
    //   setCurrentSlide(slider.track.details.rel)
    // },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div css={sliderStyle} className={containerClassName}>
      <div
        ref={sliderRef}
        className="keen-slider top-0 left-0 w-full h-full"
        style={{ position: "absolute" }}
      >
        {slides.map((slide, index) => {
          if (slide) {
            const { image } = slide
            if (image && image.sourceUrl) {
              return (
                <div
                  key={index}
                  className={`keen-slider__slide relative${
                    rounded && " rounded-lg overflow-hidden"
                  }`}
                >
                  <Image
                    src={image.sourceUrl}
                    layout="fill"
                    objectFit={imageFit}
                    alt={image.altText || ""}
                  />
                </div>
              )
            }
          }
        })}
      </div>
    </div>
  )
}

export default Slider
