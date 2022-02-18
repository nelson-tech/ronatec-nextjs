import Link from "next/link"

const PlatingOnPlastics = () => {
  return (
    <>
      <div className="w-screen mx-auto text-2xl bg-green-main text-white text-center py-2">
        <h2>Plating On Plastics</h2>
      </div>
      <div className="max-w-7xl p-8">
        <div className="text-gray-800 md:p-8 space-y-4">
          <p>
            Ronatec C2C plastics plating products meet industry environmental
            regulations and standards while offering low-temperature operations,
            superior plating applications, and a high production yield.
          </p>
          <p>
            A complete line of plastics plating processes—including
            accelerators, catalysts, direct plate processing, electroless
            copper, etchants, and electrolytic nickel plating—is available as a
            safer alternative to traditional plating on plastic.
          </p>
          <p>
            <Link href="/about/contact" passHref>
              <a className="text-blue-main underline hover:text-green-main focus:text-green-main">
                Contact us
              </a>
            </Link>{" "}
            today for further information!
          </p>
        </div>
      </div>
    </>
  )
}

export default PlatingOnPlastics
