import Image from "@components/Image"

// ####
// #### Component
// ####

const BreweryTanksPage = ({}) => {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="rounded-lg m-8 overflow-hidden">
          <Image
            src="https://cdn.ronatec.us/ronatec/20211207144134/tanks.jpg"
            alt="Brewery Tanks"
            width={1200}
            height={800}
          />
        </div>
      </div>
      <div className="max-w-7xl px-8 mx-auto">
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
    </>
  )
}

export default BreweryTanksPage
