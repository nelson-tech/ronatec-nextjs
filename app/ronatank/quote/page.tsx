// ####
// #### Component
// ####

import QuoteForm from "@components/QuoteForm"

const QuotePage = ({}) => {
  return (
    <>
      <div className="px-5 mx-auto max-w-7xl my-8">
        <div>
          <h2 className="text-2xl font-extrabold pb-6 px-5">Request A Quote</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-50 shadow px-4 py-5 sm:rounded-lg sm:p-6">
            {/* <div className="md:grid md:grid-cols-2 md:gap-6"> */}
            <div className="mt-5 md:mt-0 md:col-span-2">
              <QuoteForm />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default QuotePage

export const metadata = {
  title: "Tank Quote",
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
