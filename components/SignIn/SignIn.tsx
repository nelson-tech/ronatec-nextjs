import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { LockClosedIcon } from "@heroicons/react/solid"

import { useAuth, useFormFields } from "@lib/hooks"
import { ParsedUrlQuery } from "querystring"

type SignInProps = {
  modalRef?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const SignIn = ({ modalRef, setOpen }: SignInProps) => {
  const { loggedIn, login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()
    setError(null)

    if (fields.email && fields.password) {
      const userLogin = {
        login: fields.email,
        password: fields.password,
        rememberMe: false,
      }

      const { errors } = await login(userLogin, () => {})

      if (errors) {
        setError(errors)
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      const rederict = (router.query?.redirect as string) || undefined
      router.push(rederict || "/dashboard")
      setOpen && setOpen(false)
    }
  }, [loggedIn, router, setOpen])

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            /> */}
            <h2 className="text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
            <div className="mt-2 flex justify-center text-sm text-gray-600">
              <div>
                <span className="pr-0.5">Or</span>
              </div>
              <div onClick={() => setOpen && setOpen(false)}>
                <Link href={"/register"} passHref>
                  <a className="font-medium text-blue-main hover:text-green-main">
                    click here to register
                  </a>
                </Link>
              </div>
              <span>.</span>
            </div>
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
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="username"
                  ref={modalRef}
                  autoComplete="email"
                  required
                  onChange={handleFieldChange}
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
              <div className="text-sm text-center text-red-600">
                {error}&nbsp;
              </div>
            </div>

            <div className="text-sm text-center">
              <a
                href="/reset"
                className="font-medium text-blue-main hover:text-green-main"
              >
                Forgot your password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-main hover:bg-green-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-main"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    aria-hidden="true"
                  />
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
export default SignIn
