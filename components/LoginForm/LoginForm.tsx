import { MutableRefObject, useEffect, useState } from "react"
import { useRouter } from "next/dist/client/router"
import shallow from "zustand/shallow"
import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import LockClosedIcon from "@heroicons/react/solid/LockClosedIcon"

import useLogin from "@lib/hooks/auth/useLogin"
import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"
import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Types
// ####

type LoginFormProps = {
  modalRef?: MutableRefObject<HTMLInputElement>
  setOpen?: (open: boolean) => void
}

// ####
// #### Component
// ####

const LoginForm = ({ modalRef, setOpen }: LoginFormProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { loggedIn, error } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      error: state.auth.errors.login,
    }),
    shallow,
  )

  const { login } = useLogin()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit: SubmitHandler<{
    email: string
    password: string
    rememberMe: boolean
  }> = async data => {
    setLoading(true)
    if (data.email && data.password) {
      const cookiesInput = {
        login: data.email,
        password: data.password,
        rememberMe: true,
      }

      const jwtInput = {
        username: cookiesInput.login,
        password: cookiesInput.password,
      }

      await login({ jwtInput, cookiesInput })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (loggedIn) {
      setOpen && setOpen(false)
    }
  }, [loggedIn, setOpen])

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

  const { ref, ...restEmail } = register("email", {
    required: "Valid email is required.",
  })

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
            <div className="mt-2 flex justify-center text-sm text-gray-600">
              <div>
                <span className="pr-0.5">Or</span>
              </div>
              <div onClick={() => setOpen && setOpen(false)}>
                <Link
                  href={`/register${
                    router.query?.redirect
                      ? `?redirect=${router.query.redirect}`
                      : ""
                  }`}
                  title="Click to register."
                  className="font-medium text-blue-main hover:text-green-main"
                >
                  <span>click here to register</span>
                </Link>
              </div>
              <span>.</span>
            </div>
          </div>
          <form
            className="mt-8 space-y-2"
            action="#"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  ref={e => {
                    ref(e)
                    modalRef && e && (modalRef.current = e)
                  }}
                  autoComplete="email"
                  {...restEmail}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
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
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be 8-32 characters.",
                    },
                    maxLength: {
                      value: 32,
                      message: "Password must be 8-32 characters.",
                    },
                    required: "Password is required.",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-main focus:border-blue-main focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="mr-2 justify-end items-center flex">
              <label
                htmlFor="rememberMe"
                className="text-sm italic text-gray-400 mr-2"
              >
                Remember me?
              </label>
              <input
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
                name="rememberMe"
                className="focus:ring-blue-main h-4 w-4 text-blue-main border-blue-main rounded"
                defaultValue="false"
              />
            </div>

            <div className="pt-2">
              <ErrorField name="email" />
              <ErrorField name="password" />
              {error && (
                <p className="text-red-main text-sm pt-2 pl-2">{error}</p>
              )}
            </div>

            <div className="text-sm text-center pt-2">
              <Link
                href="/reset-password"
                className="font-medium text-blue-main hover:text-green-main"
                title="Reset your password."
              >
                Forgot your password?
              </Link>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                title="Click to sign in."
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-main"
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
