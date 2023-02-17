import Link from "next/link"

// ####
// #### Component
// ####

const PlatingOnPlasticsPage = () => {
  return (
    <>
      <div className="max-w-7xl p-8 mx-auto">
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
            <Link
              href="/about/contact"
              className="text-blue-main underline hover:text-green-main focus:text-green-main"
            >
              Contact us
            </Link>{" "}
            today for further information!
          </p>
        </div>
      </div>
    </>
  )
}

export default PlatingOnPlasticsPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Plating On Plastics",
  description:
    "Ronatec C2C plastics plating products meet industry environmental regulations and standards while offering low-temperature operations, superior plating applications, and a high production yield.",
  keywords: [
    "Plating",
    "Plating on plastics",
    "Heater",
    "Ronatec",
    "Metal Finishing",
  ],
}
