import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { LockClosedIcon, MailIcon } from "@heroicons/react/solid"

import { useAuth, useResetPassword } from "@lib/hooks"

import { MenuLink } from "@components/ui"
import { RefreshIcon } from "@heroicons/react/outline"

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState(false)
  const [passwordReset, setPasswordReset] = useState(false)

  const { loggedIn, user } = useAuth()

  const router = useRouter()

  const [username, setUsername] = useState<string | undefined>(
    router.query.username as string,
  )
  const [password, setPassword] = useState<string | null>(null)
  const [passwordConfirm, setPasswordConfirm] = useState<string | null>(null)
  const [key, setKey] = useState<string | null>(
    (router.query.key as string) || null,
  )

  const [validPassword, setValidPassword] = useState<boolean>(false)

  const {
    sendResetPasswordEmail,
    resetUserPassword,
    error: resetError,
    loading,
  } = useResetPassword()

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm()

  // Set username from logged-in state
  useEffect(() => {
    if (loggedIn && user?.email && !username) {
      setUsername(user.email)
      setValue("email", user.email)
    }
  }, [loggedIn, user, username, setUsername, setValue])

  // Set username from router (trumps logged-in state)
  useEffect(() => {
    const givenUsername = router.query.username
    if (!username && (givenUsername as string)) {
      setUsername(givenUsername as string)
      setValue("email", givenUsername)
    }
  }, [router.query, setUsername, username, setValue])

  // Set key from router
  useEffect(() => {
    const givenKey = router.query.key
    if (!key && (givenKey as string)) {
      setKey(givenKey as string)
    }
  }, [router.query, key])

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
    if (username && data.email === username) {
      const sentStatus = await sendResetPasswordEmail(username)
      sentStatus && setSentEmail(true)
    }
    console.log(data)
  }

  const onResetPasswordSubmit: SubmitHandler<FieldValues> = async data => {
    if (data.passwordConfirm && data.password) {
      if (validPassword && key && username && password) {
        const resetStatus = await resetUserPassword(key, username, password)
        resetStatus && setPasswordReset(true)
      }
    }
    console.log(data)
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
                <Link
                  href={`/register${
                    router.query?.redirect
                      ? `?redirect=${router.query.redirect}`
                      : ""
                  }`}
                  passHref
                >
                  <a className="font-medium text-blue-main hover:text-green-main">
                    click here to register
                  </a>
                </Link>
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
                    value={username}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
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
                    className="appearance-none relative block w-full px-3 py-2 border-x border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
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
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
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
                  className="font-medium text-blue-main hover:text-green-main"
                >
                  Click here to login (without resetting password).
                </MenuLink>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-main"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <div className="flip">
                        <RefreshIcon
                          aria-hidden="true"
                          className="h-5 w-5 animate-reverse-spin text-white"
                        />
                      </div>
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
                        setUsername(e.target.value)
                      },
                    })}
                    value={username || ""}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
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
                  className="font-medium text-blue-main hover:text-green-main"
                >
                  Click here to login.
                </MenuLink>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-main"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <div className="flip">
                        <RefreshIcon
                          aria-hidden="true"
                          className="h-5 w-5 animate-reverse-spin text-white"
                        />
                      </div>
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
