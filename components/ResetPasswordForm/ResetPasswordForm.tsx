"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { shallow } from "zustand/shallow"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import LockClosedIcon from "@heroicons/react/20/solid/LockClosedIcon"
import MailIcon from "@heroicons/react/20/solid/EnvelopeIcon"

import useStore from "@lib/hooks/useStore"
import useResetPassword from "@lib/hooks/useResetPassword"

import MenuLink from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Types
// ####

type ResetPasswordFormInputType = {
  detectedEmail: string | null | undefined
}

// ####
// #### Component
// ####

const ResetPasswordForm = ({ detectedEmail }: ResetPasswordFormInputType) => {
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const { loggedIn, customer } = useStore(
    state => ({ loggedIn: state.auth.loggedIn, customer: state.auth.customer }),
    shallow,
  )

  const [email, setEmail] = useState<string | null>(
    searchParams?.get("username") ?? detectedEmail ?? null,
  )
  const [key, setKey] = useState<string | null>(
    searchParams?.get("key") ?? null,
  )
  const [password, setPassword] = useState<string | null>(null)
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null)

  const [validPassword, setValidPassword] = useState<boolean>(false)

  const {
    sendResetPasswordEmail,
    resetCustomerPassword,
    error: resetError,
    loading,
  } = useResetPassword()

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm()

  // Check for matching passwords
  useEffect(() => {
    setError(null)
    if (password !== passwordConfirm) {
      setError("Passwords do not match.")
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
  }, [setError, setValidPassword, password, passwordConfirm])

  // Forward user after successful password reset
  useEffect(() => {
    if (passwordReset && !error) {
      router.push("/products")
    }
  }, [router, passwordReset, error])

  const onSendEmailSubmit: SubmitHandler<FieldValues> = async data => {
    if (email && data.email === email) {
      const sentStatus = await sendResetPasswordEmail(email)
      sentStatus && setSentEmail(true)
    }
    console.warn(data)
  }

  const onResetPasswordSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.passwordConfirm && data.password) {
      if (validPassword && key && email && password) {
        const resetStatus = await resetCustomerPassword(key, email, password)
        resetStatus && setPasswordReset(true)
      }
    }
    console.warn(data)
  }

  const ErrorField = ({ name }: { name: string }) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
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
            <h2 className="text-center text-3xl font-extrabold text-gray-700">
              Reset your password
            </h2>
            <div className="mt-2 flex justify-center text-sm text-gray-600">
              <div>
                <span className="pr-0.5">Or</span>
              </div>
              <div>
                <MenuLink
                  href={`/register${
                    searchParams?.get("redirect")
                      ? `?redirect=${searchParams.get("redirect")}`
                      : ""
                  }`}
                  className="font-medium text-accent hover:text-highlight"
                >
                  click here to register
                </MenuLink>
              </div>
              <span>.</span>
            </div>
          </div>
          {key ? (
            <form
              className="mt-8 space-y-6"
              action="#"
              method="post"
              onSubmit={handleSubmit(onResetPasswordSubmit)}
            >
              <div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email address is required.",
                    })}
                    value={email ?? ""}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
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
                    autoComplete="password"
                    minLength={8}
                    {...register("password", {
                      required: "Password is required.",
                      onChange: e => {
                        setPassword(e.target.value)
                      },
                    })}
                    value={password || ""}
                    className="appearance-none relative block w-full px-3 py-2 border-x border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="password-confirm" className="sr-only">
                    Password Confirmation
                  </label>
                  <input
                    id="password-confirm"
                    type="password"
                    autoComplete="password"
                    minLength={8}
                    {...register("passwordConfirm", {
                      required: "Password confirmation is required.",
                      onChange: e => {
                        setPasswordConfirm(e.target.value)
                      },
                    })}
                    value={passwordConfirm || ""}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
                <ErrorField name="email" />
                <ErrorField name="password" />
                <ErrorField name="passwordConfirm" />
                {error && (
                  <p className="text-red-main text-sm pt-2 pl-2">{error}</p>
                )}
                {resetError && (
                  <p className="text-red-main text-sm pt-2 pl-2">
                    {resetError}
                  </p>
                )}
              </div>
              <div className="text-sm text-center">
                <MenuLink
                  href="/login"
                  className="font-medium text-accent hover:text-highlight"
                >
                  Click here to login (without resetting password).
                </MenuLink>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <LoadingSpinner size={5} color="white" />
                    ) : (
                      <LockClosedIcon
                        className="h-5 w-5 text-gray-300 group-hover:text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  Reset Password
                </button>
              </div>
            </form>
          ) : (
            <form
              className="mt-8 space-y-6"
              action="#"
              method="post"
              onSubmit={handleSubmit(onSendEmailSubmit)}
            >
              <div className="">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email address is required.",
                      onChange: e => {
                        setEmail(e.target.value)
                      },
                    })}
                    value={email || ""}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <ErrorField name="email" />
                {error && (
                  <p className="text-red-main text-sm pt-2 pl-2">{error}</p>
                )}
                {resetError && (
                  <p className="text-red-main text-sm pt-2 pl-2">
                    {resetError}
                  </p>
                )}
              </div>

              <div className="text-sm text-center">
                <MenuLink
                  href="/login"
                  className="font-medium text-accent hover:text-highlight"
                >
                  Click here to login.
                </MenuLink>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <LoadingSpinner size={5} color="white" />
                    ) : (
                      <MailIcon
                        className="h-5 w-5 text-gray-300 group-hover:text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  Send Reset Email
                </button>
              </div>
            </form>
          )}
          {sentEmail && !error && (
            <p className="text-green-main text-sm pt-2 pl-2">
              Reset request successful. Please check your email for a link to
              reset your password.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
export default ResetPasswordForm
