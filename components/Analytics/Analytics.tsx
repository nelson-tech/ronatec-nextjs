"use client"

import Image from "@components/Image"
import Script from "next/script"

const Analytics = () => {
  const trackingPixel = process.env.NEXT_PUBLIC_TRACKING_PIXEL_URL
  const trackingScript = process.env.NEXT_PUBLIC_TRACKING_SCRIPT_URL

  return (
    <>
      <noscript>
        <Image src={trackingPixel ?? ""} alt="Analytics" width={1} height={1} />
      </noscript>
      <Script src={trackingScript} defer />
    </>
  )
}

export default Analytics
