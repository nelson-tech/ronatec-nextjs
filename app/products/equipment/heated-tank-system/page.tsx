import HeatedTankSystemComponent from "@components/Pages/Products/HeatedTankSystem"

// ####
// #### Component
// ####

const HeatedTankSystemPage = () => {
  return (
    <>
      <HeatedTankSystemComponent />
    </>
  )
}

export default HeatedTankSystemPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: "Heated Tank System",
  description:
    "Our system evaporates water from process solutions and waste waters under atmospheric conditions.",
  keywords: [
    "Tank System",
    "Heated tank system",
    "Heater",
    "Ronatec",
    "Metal Finishing",
  ],
}
