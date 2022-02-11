import PhoneIcon from "@heroicons/react/outline/PhoneIcon"

import Icon from "@components/ui/Icon"

// ####
// #### Variables
// ####

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"]

// ####
// #### Component
// ####

const Promo = () => {
  return (
    <div className="bg-blue-main">
      <div className="h-10 px-4 flex items-center justify-end text-white">
        <div className="h-6 w-6 mr-6 mt-1 hover:text-red-main">
          <a
            href="https://www.youtube.com/channel/UCxmKm_9iLJ2skg39mmoKYnA"
            target="_blank"
            rel="noreferrer"
            title="Visit our YouTube Channel"
          >
            <Icon name="youtube" type="brands" />
          </a>
        </div>
        <PhoneIcon className="h-6 w-6 mr-2" /> (855) 928-9904
      </div>
    </div>
  )
}

export default Promo
