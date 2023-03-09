"use client"

import { shallow } from "zustand/shallow"
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon"

import useStore from "@lib/hooks/useStore"

import LoadingSpinner from "@components/ui/LoadingSpinner"

// ####
// #### Component
// ####

const CartButton = () => {
  const { cart, loading, setOpen } = useStore(
    (state) => ({
      cart: state.cart.state,
      loading: state.cart.loading,
      setOpen: state.cart.setOpen,
    }),
    shallow
  )

  return (
    <button
      type="button"
      className="group -m-2 p-2 flex items-center"
      onClick={() => setOpen(true)}
    >
      <ShoppingCartIcon
        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500 "
        aria-hidden="true"
      />

      {loading ? (
        <LoadingSpinner size={4} className="ml-2" />
      ) : (
        <span
          className={`ml-2 w-4 text-sm font-medium text-gray-400 ${
            cart?.contents?.itemCount ?? "group-hover:text-gray-500"
          }`}
        >
          {cart?.contents?.itemCount ?? 0}
        </span>
      )}
      <span className="sr-only">items in cart, view bag</span>
    </button>
  )
}

export default CartButton
