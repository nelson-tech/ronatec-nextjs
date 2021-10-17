import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash } from "@components/icons"
import { LineItem } from "@common/types/cart"
import tw from "twin.macro"
import {
  imageContainerS,
  itemS,
  linkContainerS,
  productImageS,
  quantityStyle,
} from "./CartItem.style"
import { Swatch } from "@components/product"
import { useUpdateItem, useRemoveItem } from "@ecommerce/cart"
import { ChangeEvent, useState } from "react"

const CartItem = ({
  item,
  currencyCode,
}: {
  item: LineItem
  currencyCode: string
}) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const updateItem = useUpdateItem()
  const removeItem = useRemoveItem()

  const price = item.variant.price! * item.quantity || 0

  const { options } = item

  const handleQuantityChange = async (val: number) => {
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)

      const data = await updateItem({
        id: item.id,
        quantity: val,
        variantId: item.variantId,
      })
    }
  }

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    handleQuantityChange(val)
  }

  const incrementQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    handleQuantityChange(val)
  }

  return (
    <li css={itemS({ hasItem: false })}>
      <div css={imageContainerS()}>
        <Image
          onClick={() => {}}
          css={productImageS()}
          width={150}
          height={150}
          src={item.variant.image!.url}
          unoptimized
        />
      </div>
      <div css={linkContainerS()}>
        <Link href={`/`}>
          <span
            css={tw`font-bold text-lg cursor-pointer leading-6 pl-2`}
            onClick={() => {}}
          >
            {item.name}
          </span>
        </Link>
        <div css={tw`flex p-1`}>
          {options &&
            options.length > 0 &&
            options.map(option => {
              const value = option.values[0]
              return (
                <Swatch
                  key={`${item.id}-${option.displayName}`}
                  onClick={() => {}}
                  label={value.label}
                  color={value.hexColor}
                  variant={option.displayName}
                  size="s"
                  active={false}
                />
                // <span
                //   key={`${item.id}-${option.displayName}`}
                //   css={tw`text-sm font-semibold text-accents-7`}
                // >
                //   {option.values[0].label}
                // </span>
              )
            })}
        </div>
        <div css={tw`flex items-center mt-3`}>
          <button type="button">
            <Minus onClick={() => incrementQuantity(-1)} />
          </button>
          <label>
            <input
              type="number"
              max={99}
              min={0}
              css={quantityStyle()}
              value={quantity}
              onChange={handleQuantity}
            />
          </label>
          <button type="button">
            <Plus onClick={() => incrementQuantity(1)} />
          </button>
        </div>
      </div>
      <div css={tw`flex flex-col justify-between space-y-2 text-base`}>
        <span>
          {price} {currencyCode}
        </span>
        <button
          onClick={async () => {
            const cart = await removeItem({ id: item.id })
          }}
          css={tw`flex justify-end outline-none`}
        >
          <Trash />
        </button>
      </div>
    </li>
  )
}

export default CartItem
