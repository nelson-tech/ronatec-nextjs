import { SEO_TITLE } from "@lib/constants"

import QuoteForm from "@components/QuoteForm"
import PageHeader from "@components/PageHeader"

// ####
// #### Component
// ####

const QuotePage = () => {
  return (
    <>
      <div className="px-5 mx-auto max-w-7xl pb-8">
        <PageHeader title="Request A Quote" />

        <div className="space-y-6">
          <div className="bg-gray-50 shadow px-4 py-5 sm:rounded overflow-hidden sm:p-6">
            {/* <div className="md:grid md:grid-cols-2 md:gap-6"> */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuotePage

export const metadata = {
  title: `Tank Quote ${SEO_TITLE}`,
  description: "Contact us for a customized tank quote.",
  keywords: [
    "quote",
    "tanks",
    "brewery tanks",
    "Shop",
    "Ronatec",
    "Metal Finishing",
  ],
}
