import Image from "@components/Image"
import PageHeader from "@components/PageHeader"

// ####
// #### Component
// ####

const BreweryTanksPage = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Brewery Tanks" />
        <div className="w-full px-4 md:px-8">
          <Image
            src="https://cdn.ronatec.us/ronatec/20211207144134/tanks.jpg"
            alt="Brewery Tanks"
            width={1200}
            height={800}
            className="rounded overflow-hidden"
          />
        </div>
        <div className="text-gray-800 prose max-w-none p-8">
          <p>
            Tanks for fermentation and conditioning of commercial beverages.
          </p>
          <p>
            Brewery tanks from 3.5-barrels/4-hectoliters to 150
            barrels/172-hectoliters.
          </p>
          <ul className="lis list-disc list-inside py-4">
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
    </>
  )
}

export default BreweryTanksPage

export const metadata = {
  title: "Brewery Tanks",
  description:
    "Tanks for fermentation and conditioning of commercial beverages.",
  keywords: [
    "brewery",
    "tanks",
    "brewery tanks",
    "Shop",
    "Ronatec",
    "Metal Finishing",
  ],
}
