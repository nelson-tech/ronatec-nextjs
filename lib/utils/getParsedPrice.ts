import { Product } from "payload/generated-types"

type PropsType = {
  product: Product | null
}

const getParsedPrice = ({ product }: PropsType) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
  const wcPriceString = product?.wc?.prices?.price ?? "0"

  const wcPriceNum = Number.parseFloat(wcPriceString) / 100
  const price = product?.tags
    ?.map((tag) => (typeof tag === "object" ? tag.slug?.toLowerCase() : tag))
    .includes("lanco")
    ? formatter.format(wcPriceNum * 0.97)
    : formatter.format(wcPriceNum)

  return price
}

export default getParsedPrice
