import {
  ExternalProduct,
  GroupProduct,
  Page,
  Product,
  ProductCategory,
  SimpleProduct,
  Supplier,
  VariableProduct,
} from "@api/gql/types"
import { ApolloReturnInfoType } from "./common"

export type { ApolloReturnInfoType } from "./common"
export type { MenuItemType } from "./common"
export type { MainMenuReturnType } from "./common"
export type { ImageMediaDetailsType } from "./common"
export type { ImageDetailsType } from "./common"
export type { ImageType } from "./common"
export type { CardType } from "./common"
export type { LinkCardType } from "./common"
export type { PageCommonType } from "./common"
export type { ImageCardType } from "./common"
export type { TitleContentType } from "./common"

export type { EmployeeCommonType } from "./employee"
export type { SalesRepType } from "./employee"

export type PageReturnType = ApolloReturnInfoType & {
  data: {
    page: Page
  }
}

export type SuppliersReturnType = ApolloReturnInfoType & {
  data: {
    suppliers: { nodes: Supplier[] }
  }
}

export type ProductReturnType = ApolloReturnInfoType & {
  data: {
    product: Product &
      VariableProduct &
      SimpleProduct &
      GroupProduct &
      ExternalProduct
  }
}

export type ProductsReturnType = ApolloReturnInfoType & {
  data: {
    products: {
      nodes: (Product &
        VariableProduct &
        SimpleProduct &
        GroupProduct &
        ExternalProduct)[]
    }
  }
}

export type CategoryReturnType = ApolloReturnInfoType & {
  data: {
    productCategory: ProductCategory
  }
}

export type CategoriesReturnType = ApolloReturnInfoType & {
  data: {
    productCategories: { nodes: ProductCategory[] }
  }
}
