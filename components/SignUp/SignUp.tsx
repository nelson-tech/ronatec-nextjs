import React, { FormEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import { v4 as uuid } from "uuid"
import { LockClosedIcon } from "@heroicons/react/solid"

import { useAuth, useFormFields } from "@lib/hooks"
import { LoadingDots } from "@components/ui"
import { registerMutation } from "@api/mutations"

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const { loggedIn, setAuthToken, setRefreshToken } = useAuth()

  useEffect(() => {
    if (loggedIn) {
      router.push("/dashboard/")
    }
  }, [loggedIn, router])

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  const [registrationMutation] = useMutation(registerMutation)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setLoading(true)

    const input = {
      clientMutationId: uuid(),
      username: fields.email,
      firstName: fields.firstName || null,
      lastName: fields.lastName || null,
      email: fields.email,
      password: fields.password,
    }

    await registrationMutation({
      variables: {
        input,
      },
      onCompleted({ registerUser }) {
        if (registerUser) {
          const user = registerUser.user || null

          if (user) {
            setAuthToken(user.jwtAuthToken)
            setRefreshToken(user.jwtRefreshToken, () => {
              const rederict = (router.query?.redirect as string) || undefined
              router.push(rederict || "/dashboard")
            })
          }
          // TODO - Handle error cases
        }
      },
      onError({ message }) {
        setError(message.split(":")[1])
      },
    })
    setLoading(false)
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Sign Up Today
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="given-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="given-name"
                  autoComplete="given-name"
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="family-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="family-name"
                  autoComplete="family-name"
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleFieldChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={32}
                  required
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium hover:font-bold rounded-md text-white bg-blue-main hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-main"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  {loading ? (
                    <LoadingDots />
                  ) : (
                    <LockClosedIcon
                      className="h-5 w-5 text-gray-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Register
              </button>
            </div>

            <div>
              <div className="text-sm text-red-600">{error}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
