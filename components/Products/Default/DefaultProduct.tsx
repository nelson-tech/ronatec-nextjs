import {
  ExternalProduct,
  GroupProduct,
  Product,
  SimpleProduct,
  VariableProduct,
} from "@api/gql/types"
import { HTML } from "@components"
import { Image } from "@components/Image"
import {
  Container,
  ProductMainContainer,
  ProductTopContainer,
  TopContainer,
} from "./style"

type Props = {
  product: Product &
    VariableProduct &
    SimpleProduct &
    GroupProduct &
    ExternalProduct
}

const DefaultProduct = ({ product }: Props) => {
  return (
    <>
      <Container>
        <TopContainer>
          {product.image?.sourceUrl && (
            <Image
              src={product.image.sourceUrl}
              layout="responsive"
              objectFit="contain"
              height={product.image?.mediaDetails?.height}
              width={product.image?.mediaDetails?.width}
              rounded="lg"
            />
          )}
          <ProductTopContainer>
            <h2 className="text-2xl">{product.name}</h2>
            {product.price}
            {product.variations?.nodes?.map(variation => {
              return (
                <div
                  key={variation?.slug || "" + variation?.price}
                  className="px-4 pt-4"
                >
                  <div>
                    {variation?.description} - {variation?.price}
                  </div>
                </div>
              )
            })}
          </ProductTopContainer>
        </TopContainer>
        <ProductMainContainer>
          <HTML html={product.description} />
        </ProductMainContainer>
      </Container>
    </>
  )
}

export default DefaultProduct
