"use client"

import { FormEventHandler, useState } from "react"

import { Product, ProductItems } from "payload/generated-types"
import useStore from "@hooks/useStore"
import useCart from "@hooks/useCart"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import range from "@utils/range"

type AddToCartButtonProps = {
  product: Product
}

const AddToCartForm = ({ product }: AddToCartButtonProps) => {
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { cart, loading, setLoading, setOpen, setAlert } = useStore(
    (stores) => ({
      cart: stores.cart.state,
      loading: stores.cart.loading,
      setLoading: stores.cart.setLoading,
      setOpen: stores.cart.setOpen,
      setAlert: stores.alert.setAlert,
    })
  )

  const { addCartItems } = useCart()

  const inCart = cart?.items
    ?.map((item) =>
      typeof item.product === "object" ? item.product.id : item.product
    )
    .includes(product?.id ?? "")

  const quantityAvailable = product.manageStock ? product.stock : 9999

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    console.log("Product page adding")
    event.preventDefault()

    if (inCart) {
      setOpen(true)
    } else {
      setError(null)

      if (product?.id) {
        let input: ProductItems[0] = {
          product: product.id,
          title: product.title,
          quantity,
          prices: product?.prices,
        }
        setLoading(true)

        await addCartItems([input])
      } else {
        setAlert({
          open: true,
          kind: "error",
          primary: "Product ID not found.",
        })
      }
    }
  }
  return (
    <form className="" onSubmit={handleSubmit}>
      {/* {product?.has_options &&
    product.attributes &&
    product.attributes.map((attribute) => {
      return (
        <RadioGroup
          value={selectedVariation}
          onChange={setSelectedVariation}
          className="mt-4 pt-8"
          key={attribute.id}
        >
          <RadioGroup.Label className="sr-only">
            Choose a variation
          </RadioGroup.Label>
          <div
            key={attribute.id}
            className="text-base font-bold pb-3"
          >
            {attribute.name}:
          </div>
          <div className="flex flex-wrap items-center justify-center space-x-4">
            {attribute.terms.map((variation) => {
              if (variation) {
                return (
                  <RadioGroup.Option
                    key={variation.name}
                    value={variation}
                    className={({ checked }) =>
                      `transition-all group 
                ${
                  checked
                    ? "bg-accent text-white "
                    : "bg-white hover:bg-highlight"
                }
                  relative rounded border shadow-sm border-opacity-80 px-5 py-4 mb-4 cursor-pointer flex outline-none`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className="flex items-center justify-between w-full outline-none">
                          <div className="flex items-center outline-none">
                            <div className="text-sm outline-none">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium ring-transparent transition-colors ${
                                  checked
                                    ? "text-white"
                                    : "text-gray-900 group-hover:text-white"
                                }`}
                              >
                                {variation.name}
                              </RadioGroup.Label>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                )
              }
            })}
          </div>
        </RadioGroup>
      )
    })} */}
      {product.manageStock && (
        <div className="mt-8 text-highlight">{quantityAvailable} in stock</div>
      )}
      <div className="flex justify-center items-center mt-4">
        {!inCart && (quantityAvailable ?? 0) > 1 && (
          <>
            <label htmlFor={`quantity-${product.id}`} className="sr-only">
              Quantity, {product.title}
            </label>
            <select
              id={`quantity-${product.id}`}
              name={`quantity-${product.id}`}
              onChange={(v) => setQuantity(Number.parseInt(v.target.value))}
              className="max-w-full rounded-md border border-gray-300 text-left text-base font-medium leading-5 text-gray-700
          shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm
          mr-4"
            >
              {range(1, Math.min(10, quantityAvailable ?? 9999)).map(
                (num, i) => (
                  <option key={"product-details-" + i + num} value={num}>
                    {num}
                  </option>
                )
              )}
            </select>
          </>
        )}
        <button
          type="submit"
          className={`relative w-full bg-accent rounded py-3 px-8 flex items-center justify-center 
          hover:bg-highlight focus:outline-none focus:ring-0 transition-colors group`}
          disabled={loading}
        >
          {loading ? (
            <span>
              <LoadingSpinner size={6} color="white" opacity={75} />
            </span>
          ) : (
            <>
              <span className="text-base font-medium text-white">
                {inCart ? "View in cart" : "Add to cart"}
              </span>

              {inCart && (
                <div className="absolute -right-8 opacity-0 text-white group-hover:right-8 group-hover:opacity-100 transition-all flex">
                  <ArrowLeftIcon className="w-4 mr-2" />
                  <ShoppingCartIcon className="w-4 " />
                </div>
              )}
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="my-4 text-sm text-red-600">
          <span>{error}</span>
        </div>
      )}
    </form>
  )
}

export default AddToCartForm
