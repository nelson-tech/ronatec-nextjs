import dynamic from "next/dist/shared/lib/dynamic"

import withUrql from "@api/urql/hoc"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const Image = dynamic(() => import("@components/Image"), clientOpts)

// ####
// #### Component
// ####

const BreweryTanks = ({}) => {
  return (
    <>
      <Layout>
        <PageTitle
          title="Brewery Tanks"
          description="Tanks for fermentation and conditioning of commercial beverages."
          banner={false}
        />

        <div className="max-w-7xl px-8">
          <div className="rounded-lg m-8 overflow-hidden">
            <Image
              src="https://cdn.ronatec.us/ronatec/20211207144134/tanks.jpg"
              alt="Brewery Tanks"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <div className="text-gray-800 px-8 pb-8">
            <p>
              Tanks for fermentation and conditioning of commercial beverages.
            </p>
            <p>
              Brewery tanks from 3.5-barrels/4-hectoliters to 150
              barrels/172-hectoliters.
            </p>
            <ul className="lis list-disc list-inside py-6">
              <li>Custom-built true shadowless manways.</li>
              <li>Separate CIP and blow off tubes.</li>
              <li>
                Tank interiors are a 2B finish and sterile polished to 440 grit.
              </li>
            </ul>
            Our engineers can custom design tanks and vessels to meet the
            individual requirements of our customers.
          </div>
        </div>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(BreweryTanks)
