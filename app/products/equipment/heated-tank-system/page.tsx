import { SEO_TITLE } from "@lib/constants"

import PageHeader from "@components/PageHeader"
import HeatedTankSystemComponent from "@components/Pages/Products/HeatedTankSystem"

// ####
// #### Variables
// ####

const title = "Heated Tank System"

// ####
// #### Component
// ####

const HeatedTankSystemPage = () => {
  return (
    <>
      <PageHeader title={title} />
      <HeatedTankSystemComponent />
    </>
  )
}

export default HeatedTankSystemPage

export const metadata = {
  title: `${title} ${SEO_TITLE}`,
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
