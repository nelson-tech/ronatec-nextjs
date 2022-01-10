import React, { FormEventHandler, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { gql, useApolloClient, useMutation } from "@apollo/client"
import { v4 as uuid } from "uuid"

import {
  registerMutation,
  setAuthToken,
  setRefreshToken,
} from "@lib/apollo/auth"
import { useAuth, useFormFields } from "@lib/hooks"
import { LockClosedIcon } from "@heroicons/react/solid"
import { initializeApollo } from "@lib/apollo"

const labelStyle = {
  marginTop: 16,
}

const SignUpForm = () => {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    if (auth && auth.isLoggedIn()) {
      router.push("/dashboard/")
    }
  }, [auth])

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const client = initializeApollo({})

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setIsLoading(true)

    console.log(fields)

    await client
      .mutate({
        mutation: registerMutation,
        variables: {
          input: {
            clientMutationId: uuid(),
            username: fields.email,
            firstName: fields.firstName || null,
            lastName: fields.lastName || null,
            email: fields.email,
            password: fields.password,
          },
        },
      })
      .then(response => {
        console.log("RESPONSE", response)

        const { registerUser } = response.data

        const user = registerUser.user || null

        if (user) {
          setAuthToken(user.jwtAuthToken)
          setRefreshToken(user.jwtRefreshToken, () =>
            router.push("/dashboard/"),
          )
        }

        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
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
                <label htmlFor="first-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="first-name"
                  autoComplete="first-name"
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="last-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="last-name"
                  autoComplete="last-name"
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  required
                  onChange={handleFieldChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-light group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
