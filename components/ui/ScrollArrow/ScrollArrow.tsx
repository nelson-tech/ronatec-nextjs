import { useEffect, useState } from "react"
import { keyframes } from "@emotion/react"
import ArrowCircleUpIcon from "@heroicons/react/solid/ArrowCircleUpIcon"
import styled from "@emotion/styled"
import smoothscroll from "smoothscroll-polyfill"

// kick off the polyfill!

// import '../App.css';

const FaderKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
`

const ArrowIcon = styled(ArrowCircleUpIcon)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  -webkit-animation: ${FaderKeyframes} 0.3s;
  animation: ${FaderKeyframes} 0.3s;
`

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    smoothscroll.polyfill()
    window.addEventListener("scroll", checkScrollTop)
    return () => {
      window.removeEventListener("scroll", checkScrollTop)
    }
  })

  return (
    <ArrowIcon
      className="text-blue-main bg-white rounded-full"
      onClick={scrollTop}
      style={{ height: 40, display: showScroll ? "block" : "none" }}
    />
  )
}

export default ScrollArrow
