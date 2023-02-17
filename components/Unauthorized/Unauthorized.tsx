import Link from "@components/Link"

// ####
// #### Component
// ####

const Unauthorized = () => {
  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <p className="text-xl font-semibold text-accent uppercase tracking-wide">
                Authorization error
              </p>
              <p className="mt-2 text-base text-gray-500">
                You don&apos;t have permission to view this page.
              </p>
              <div className="mt-6 text-gray-500">
                <Link
                  href="/login"
                  title="Sign in to your account"
                  className="text-base font-medium text-highlight hover:text-accent transition"
                >
                  Sign In
                </Link>{" "}
                or{" "}
                <Link
                  href="/register"
                  title="Register a new account"
                  className="text-base font-medium text-highlight hover:text-accent transition"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Unauthorized
