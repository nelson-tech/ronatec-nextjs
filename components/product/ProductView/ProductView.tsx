import cn from "classnames"
import { FC, useState } from "react"
import s from "./ProductView.module.css"
import { Button, Container } from "@components/ui"
import Image from "next/image"
import { Product } from "@common/types/product"
import tw from "twin.macro"
import { ProductSlider, Swatch } from "@components/product"
import { Choices, getVariant } from "@lib/helpers"
import { useUI } from "@components/ui/context"
import useAddItem from "@ecommerce/cart/use-add-item"

interface Props {
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({})

  const { openSidebar } = useUI()
  const addItem = useAddItem()

  const variant = getVariant(product, choices)

  const addToCart = async () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: String(variant?.id),
        variantOptions: variant?.options,
        quantity: 1,
      }

      const output = await addItem(item)

      openSidebar()
    } catch (error) {
      throw error
    }
  }

  return (
    <Container>
      <div className={cn(s.root, "fit")} css={tw`mb-5`}>
        <div className={cn(s.productDisplay, "fit")}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.price.value}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            {product.images.map(image => (
              <div key={image.url} className={s.imageContainer}>
                <Image
                  className={s.img}
                  src={image.url}
                  alt={image.alt}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options.map(option => (
              <div key={option.id} css={tw`pb-4`}>
                <h2 css={tw`uppercase font-medium`}>{option.displayName}</h2>
                <div css={tw`flex flex-row py-4`}>
                  {option.values.map(optValue => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()]

                    return (
                      <Swatch
                        key={`${option.id}-${optValue.label}`}
                        label={optValue.label}
                        color={optValue.hexColor}
                        variant={option.displayName}
                        active={optValue.label.toLowerCase() === activeChoice}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              optValue.label.toLowerCase(),
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div css={tw`pb-14 break-words w-full max-w-xl text-lg`}>
              {product.description}
            </div>
          </section>
          <div>
            <Button
              onClick={addToCart}
              className={s.button}
              disabled={!variant}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
