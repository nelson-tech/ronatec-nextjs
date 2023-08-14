"use client"

import SlickSlider, { Settings as SliderSettings } from "react-slick"

import Image from "@components/Image"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ConsultingSlides } from "payload/generated-types"

// ####
// #### Types
// ####

export type SliderPropsType = {
  slides: ConsultingSlides
  sliderStyle?: string
  rounded?: boolean
  options?: SliderSettings
  containerClassName?: string
}

const defaultOptions: SliderSettings = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
}

// ####
// #### Component
// ####

const Slider = ({
  slides,
  sliderStyle,
  rounded = false,
  options = defaultOptions,
  containerClassName,
}: SliderPropsType) => {
  return (
    <div
      className={`${
        rounded && "rounded overflow-hidden"
      } ${containerClassName}`}
    >
      <SlickSlider
        {...options}
        className={`w-full rounded overflow-hidden z-10 ${sliderStyle}`}
      >
        {slides.map((slide) => {
          const image = typeof slide?.image === "object" ? slide.image : null
          return (
            <div key={image?.id} className={` relative w-full aspect-[3/2]`}>
              <Image
                src={image?.url ?? ""}
                alt={image?.alt ?? ""}
                fill
                sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
                className="object-cover -z-[1]"
              />
            </div>
          )
        })}
      </SlickSlider>
    </div>
  )
}

export default Slider
