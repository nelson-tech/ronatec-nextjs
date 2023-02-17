"use client"

import Image from "next/image"

import SlickSlider, { Settings as SliderSettings } from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Maybe, Post_Common_Slides } from "@api/codegen/graphql"

// ####
// #### Types
// ####

export type SliderPropsType = {
  slides: Maybe<Post_Common_Slides>[]
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
    <div className={containerClassName + " " + sliderStyle}>
      <SlickSlider {...options} className="w-full h-96">
        {slides.map((slide) => {
          const image = slide?.image
          return (
            <div
              key={image?.id}
              className={` relative w-full h-96 ${
                rounded && " rounded-lg overflow-hidden"
              }`}
            >
              <Image
                src={image?.sourceUrl ?? ""}
                fill
                sizes="(max-width: 400px) 100vw,(max-width: 768px) 50vw,33vw"
                alt={image?.altText ?? ""}
                className="object-cover"
              />
            </div>
          )
        })}
      </SlickSlider>
    </div>
  )
}

export default Slider
