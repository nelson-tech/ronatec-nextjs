import { Product } from "@common/types/product"

type AvailableChoices = "color" | "size" | string

export type Choices = {
  [P in AvailableChoices]: string
}

export const getVariant = (product: Product, choices: Choices) =>
  product.variants.find(variant =>
    variant.options.every(varOption => {
      const optionName = varOption.displayName.toLowerCase()

      return (
        optionName in choices &&
        choices[optionName] === varOption.values[0].label.toLowerCase()
      )
    }),
  )
