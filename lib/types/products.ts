import {
  ExternalProduct,
  GroupProduct,
  Product,
  ProductVariation,
  SimpleProduct,
  VariableProduct,
} from "@api/gql/types"

export type FullProduct = Product &
  VariableProduct &
  SimpleProduct &
  GroupProduct &
  ExternalProduct

export type AttributeType = {
  name: string | null | undefined
  id: string
  variations: ProductVariation[]
}
