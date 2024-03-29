import PhoneIcon from "@heroicons/react/20/solid/PhoneIcon"

// ####
// #### Variables
// ####

// const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"]

const YouTubeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    fill="currentColor"
  >
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
  </svg>
)

// ####
// #### Component
// ####

const Promo = ({ className }: { className?: string }) => {
  return (
    <div className={"bg-blue-main " + className}>
      <div className="h-10 px-4 flex items-center justify-end text-white">
        <div className="h-6 w-6 mr-6 mt-1 hover:text-red-400 transition-colors">
          <a
            href="https://www.youtube.com/channel/UCxmKm_9iLJ2skg39mmoKYnA"
            target="_blank"
            rel="noreferrer"
            title="Visit our YouTube Channel"
          >
            {YouTubeIcon}
          </a>
        </div>
        <a
          href="tel:+1-855-928-9904"
          className="flex hover:text-highlight transition-colors"
        >
          <PhoneIcon className="h-6 w-6 mr-2" />
          <span>+1 (855) 928-9904</span>
        </a>
      </div>
    </div>
  )
}

export default Promo
