import Image from "next/image"

const Tracking = () => {
  return (
    <>
      <noscript>
        <Image
          alt="Stats Pixel"
          src="https://shy.nelson.tech/ingress/053dbbb3-d5b9-4641-b9e8-51e7a321e8c0/pixel.gif"
        />
      </noscript>
      <script
        defer
        src="https://shy.nelson.tech/ingress/053dbbb3-d5b9-4641-b9e8-51e7a321e8c0/script.js"
      ></script>
    </>
  )
}

export default Tracking
