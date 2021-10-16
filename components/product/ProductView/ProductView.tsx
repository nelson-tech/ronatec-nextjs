import cn from "classnames"
import { FC } from "react"
import s from "./ProductView.module.css"
import { Button, Container } from "@components/ui"
import Image from "next/image"
import { Product } from "@common/types/product"
import tw from "twin.macro"
import { ProductSlider } from "@components/product"

interface Props {
  product: Product
}

const ProductView: FC<Props> = ({ product }) => {
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
            <div css={tw`pb-4`}>
              <h2 css={tw`uppercase font-medium`}>Color</h2>
              <div css={tw`flex flex-row py-4`}>Variant Options Here!</div>
            </div>
            <div css={tw`pb-14 break-words w-full max-w-xl text-lg`}>
              {product.description}
            </div>
          </section>
          <div>
            <Button onClick={() => {}} className={s.button}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductView
