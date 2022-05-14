import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"
import shallow from "zustand/shallow"

import useStore from "@lib/hooks/useStore"
import { getWooSession } from "@api/urql/utils"

import Modal from "@components/ui/Modal"

const CartWarningModal = () => {
  const [warnGuest, setWarnGuest] = useState(false)

  const router = useRouter()

  const { loggedIn, checkout, setCheckout, setSessionError } = useStore(
    state => ({
      loggedIn: state.auth.loggedIn,
      checkout: state.cart.shouldCheckout,
      setCheckout: state.cart.setCheckout,
      setSessionError: state.cart.setSessionError,
    }),
    shallow,
  )

  const sendToCheckout = useCallback(
    ({ force = false }: { force?: boolean }) => {
      if (!loggedIn && !force) {
        setWarnGuest(true)
      } else {
        const clientShopId = getWooSession()?.clientShopId
        if (clientShopId) {
          router.push(
            `${process.env.NEXT_PUBLIC_API_CHECKOUT_BASE_URL}${
              loggedIn ? "" : `?session_id=${clientShopId}`
            }`,
          )
        } else {
          setSessionError("Shopping Session not found.")
        }
      }
    },
    [loggedIn, router, setSessionError, setWarnGuest],
  )

  useEffect(() => {
    if (checkout) {
      sendToCheckout({})
      setCheckout(false)
    }
  }, [checkout, setCheckout, sendToCheckout])

  const handleGuestConfirm = () => {
    setWarnGuest(false)
    sendToCheckout({ force: true })
  }

  const handleAuthenticate = (target: string) => {
    setWarnGuest(false)
    const clientShopId = getWooSession()?.clientShopId
    if (clientShopId) {
      const redirect = `${process.env.NEXT_PUBLIC_API_CHECKOUT_BASE_URL}?session_id=${clientShopId}`
      router.push(`/${target}?redirect=${redirect}`)
    }
  }

  return (
    <>
      <Modal open={warnGuest} setOpen={setWarnGuest}>
        <div>
          <div className="text-center text-xl font-extrabold uppercase text-gray-800 pb-4">
            Guest Checkout
          </div>
          <div className="text-sm text-gray-500">
            If you checkout without creating an account, you&apos;ll miss out on
            some great features like tracking the status of your order and
            viewing past orders. Creating an account is fast and only requires
            an email address. Are you sure you want to checkout as a guest?
          </div>
          <div className="mt-6">
            <button
              onClick={handleGuestConfirm}
              className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-main hover:bg-gray-100 hover:text-blue-main hover:shadow-md"
            >
              Guest Checkout
            </button>
          </div>
          <div className="flex pt-2 justify-between space-x-2">
            <div
              onClick={() => handleAuthenticate("login")}
              className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-main hover:bg-gray-100 hover:text-green-main cursor-pointer hover:shadow-md"
            >
              Login
            </div>
            <div
              onClick={() => handleAuthenticate("register")}
              className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-main hover:bg-gray-100 hover:text-green-main cursor-pointer hover:shadow-md"
            >
              Register
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CartWarningModal
