import Image from "next/image"

// ####
// #### Component
// ####

const Tracking = () => {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <noscript>
            <Image
              alt="Stats Pixel"
              src="https://shy.nelson.tech/ingress/053dbbb3-d5b9-4641-b9e8-51e7a321e8c0/pixel.gif"
              height={1}
              width={1}
            />
          </noscript>
          <script
            defer
            src="https://shy.nelson.tech/ingress/053dbbb3-d5b9-4641-b9e8-51e7a321e8c0/script.js"
          ></script>
        </>
      )}
    </>
  )
}

export default Tracking
