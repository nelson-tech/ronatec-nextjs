"use client"

import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import LockClosedIcon from "@heroicons/react/20/solid/LockClosedIcon"

import useRegister from "@lib/hooks/auth/useRegister"

import MenuLink from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Component
// ####

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)

  const { register: registerUser } = useRegister()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<{
    firstName: string
    lastName: string
    email: string
    password: string
  }> = async (data) => {
    const { firstName, lastName, email, password } = data

    setLoading(true)

    const input = {
      username: email,
      firstName,
      lastName,
      email,
      password,
    }

    await registerUser(input)

    setLoading(false)
  }

  const ErrorField = ({ name }: { name: string }) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="text-red-main text-sm pt-2 pl-2">{message}</p>
        )}
      />
    )
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded -space-y-px">
              <div>
                <label htmlFor="given-name" className="sr-only">
                  First Name
                </label>
                <input
                  id="first-name"
                  {...register("firstName")}
                  type="text"
                  autoComplete="given-name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label htmlFor="family-name" className="sr-only">
                  Last Name
                </label>
                <input
                  id="family-name"
                  {...register("lastName")}
                  type="text"
                  autoComplete="family-name"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: "Email is required." })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  minLength={8}
                  maxLength={32}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <ErrorField name="firstName" />
              <ErrorField name="lastName" />
              <ErrorField name="email" />
              <ErrorField name="password" />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-accent hover:bg-highlight transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                  {loading ? (
                    <LoadingSpinner size={5} color="white" />
                  ) : (
                    <LockClosedIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Register
              </button>
            </div>

            <div className="flex items-center relative">
              <div className="text-sm absolute right-0">
                <MenuLink
                  title="Login"
                  href="/login"
                  className="text-accent hover:text-highlight transition"
                >
                  Click here to login.
                </MenuLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
