import ExclamationIcon from "@heroicons/react/20/solid/ExclamationCircleIcon"

import Link from "@components/Link"

// ####
// #### Component
// ####

const GuestCheckoutWarning = () => {
  return (
    <>
      <div className="rounded bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              You are not logged in.
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                If you checkout as a guest, you&apos;ll miss out on some great
                features like tracking the status of your order and viewing past
                orders.{" "}
                <Link
                  href="/register?redirect=/checkout"
                  title="Register a new account."
                  className="underline transition hover:text-highlight"
                >
                  Creating an account
                </Link>{" "}
                is fast and only requires an email address. If you already have
                an account,{" "}
                <Link
                  href="/login?redirect=/checkout"
                  title="Login to your account."
                  className="underline transition hover:text-highlight"
                >
                  click here to login
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestCheckoutWarning
