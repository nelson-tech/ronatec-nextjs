import { SEO_TITLE } from "@utils/constants"

import PageHeader from "@components/PageHeader"
import UsedEquipmentForm from "@components/UsedEquipmentForm"

// ####
// #### Component
// ####

const SellYourEquipmentPage = () => {
  return (
    <>
      <div className="px-5 mx-auto max-w-7xl pb-8">
        <PageHeader title="Sell Your Equipment " />

        <div>
          <p className="text-sm text-center pb-8">
            Fill out the form below and our team will get in touch with you as
            soon as possible!
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 shadow px-4 py-5 sm:rounded overflow-hidden sm:p-6">
            {/* <div className="md:grid md:grid-cols-2 md:gap-6"> */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <UsedEquipmentForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellYourEquipmentPage

export const metadata = {
  title: `Sell Your Equipment ${SEO_TITLE}`,
  description: "Contact us to list your equipment for sale.",
  keywords: ["used equipment"],
}
