import Link from "next/link"

import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

// ####
// #### Component
// ####

const PlatingOnPlastics = () => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Plating On Plastics"
          description="Ronatec C2C plastics plating products meet industry environmental
      regulations and standards while offering low-temperature operations,
      superior plating applications, and a high production yield."
        />

        <div className="max-w-7xl p-8">
          <div className="text-gray-800 md:p-8 space-y-4">
            <p>
              Ronatec C2C plastics plating products meet industry environmental
              regulations and standards while offering low-temperature
              operations, superior plating applications, and a high production
              yield.
            </p>
            <p>
              A complete line of plastics plating processes—including
              accelerators, catalysts, direct plate processing, electroless
              copper, etchants, and electrolytic nickel plating—is available as
              a safer alternative to traditional plating on plastic.
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
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(PlatingOnPlastics)
