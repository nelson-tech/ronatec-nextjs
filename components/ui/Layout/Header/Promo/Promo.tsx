import { Icon, MenuLink } from "@components/ui"
import { PhoneIcon } from "@heroicons/react/outline"

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"]

const Promo = () => {
  return (
    <div className="bg-blue-dark">
      {/* <div className="mx-auto flex items-center justify-between sm:px-6 lg:px-8"> */}
      {/* Currency selector */}
      {/* <form className="hidden lg:block lg:flex-1">
          <div className="flex">
            <label htmlFor="desktop-currency" className="sr-only">
              Currency
            </label>
            <div className="-ml-2 group relative bg-gray-900 border-transparent rounded-md focus-within:ring-2 focus-within:ring-white">
              <select
                id="desktop-currency"
                name="currency"
                className="bg-none bg-gray-900 border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-white group-hover:text-gray-100 focus:outline-none focus:ring-0 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency}>{currency}</option>
                ))}
              </select>
              <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none">
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  className="w-5 h-5 text-gray-300"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 8l4 4 4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form> */}

      <div className="h-10 px-4 flex items-center justify-end text-white">
        <div className="h-6 w-6 mr-6 mt-1 hover:text-red-main">
          <a
            href="https://www.youtube.com/channel/UCxmKm_9iLJ2skg39mmoKYnA"
            target="_blank"
            title="Visit our YouTube Channel"
          >
            <Icon name="youtube" type="brands" />
          </a>
        </div>
        <PhoneIcon className="h-6 w-6 mr-2" /> (855) 928-9904
      </div>

      {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          <a
            href="#"
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            Create an account
          </a>
          <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
          <a
            href="#"
            className="text-sm font-medium text-white hover:text-gray-100"
          >
            Sign in
          </a>
        </div> */}
      {/* </div> */}
    </div>
  )
}

export default Promo
