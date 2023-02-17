import CarbonateRemovalSystemComponent from "@components/Pages/Products/CarbonateRemovalSystem"

// ####
// #### Component
// ####

const CarbonateRemovalSystemPage = () => {
  return (
    <>
      <CarbonateRemovalSystemComponent />
    </>
  )
}

export default CarbonateRemovalSystemPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Carbonate Removal System",
  description:
    "The Ronatec DeCarb is the premier domestically designed and manufactured sodium carbonate removal system.",
  keywords: ["Carbonate", "Removal", "Ronatec", "Metal Finishing"],
}
