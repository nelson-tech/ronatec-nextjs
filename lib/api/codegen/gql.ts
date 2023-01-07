/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}": types.CartBaseFragmentDoc,
    "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n      value\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}": types.CartItemFragmentDoc,
    "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}": types.ImageBaseFragmentDoc,
    "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}": types.CustomerBaseFragmentDoc,
    "fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}": types.EmployeeBaseFragmentDoc,
    "fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}": types.SalesRepFragmentFragmentDoc,
    "fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}": types.OrderProductBaseFragmentDoc,
    "fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}": types.CardsFragmentFragmentDoc,
    "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}": types.PageCommonBaseFragmentDoc,
    "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}": types.ProductAttributeBaseFragmentDoc,
    "fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: \"_product_addons\") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}": types.ProductBaseFragmentDoc,
    "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}": types.ProductCategoryBaseFragmentDoc,
    "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}": types.ProductMinBaseFragmentDoc,
    "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}": types.ProductPriceBaseFragmentDoc,
    "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}": types.ProductVariationBaseFragmentDoc,
    "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}": types.SimpleProductFragmentFragmentDoc,
    "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}": types.VariableProductFragmentFragmentDoc,
    "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}": types.VariationAttributeBaseFragmentDoc,
    "fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}": types.FeaturedSupplierFragmentFragmentDoc,
    "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n}": types.UserAuthBaseFragmentDoc,
    "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}": types.UserFragmentDoc,
    "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}": types.LoginUserDocument,
    "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}": types.LogoutUserDocument,
    "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}": types.RefreshAuthTokenDocument,
    "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}": types.RegisterUserDocument,
    "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}": types.ResetUserPasswordDocument,
    "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}": types.SendPasswordResetEmailDocument,
    "\n  mutation AddToCart($input: AddToCartInput!) {\n    addToCart(input: $input) {\n      cart {\n        isEmpty\n        contents {\n          itemCount\n          productCount\n          edges {\n            node {\n              extraData {\n                key\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.AddToCartDocument,
    "\n  mutation ClearCart($input: EmptyCartInput!) {\n    emptyCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n": types.ClearCartDocument,
    "\n  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n    removeItemsFromCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n": types.RemoveCartItemDocument,
    "\n  mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n    updateItemQuantities(input: $input) {\n      cart {\n        ...CartBase\n      }\n    }\n  }\n": types.UpdateCartItemQuantityDocument,
    "\n  mutation Checkout($input: CheckoutInput!) {\n    checkout(input: $input) {\n      customer {\n        ...CustomerBase\n      }\n      order {\n        ...OrderProductBase\n      }\n      result\n    }\n  }\n": types.CheckoutDocument,
    "query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: \"home\", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLink {\n          title\n          provider\n          videoId\n          videoUrl\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}": types.GetHomeDataDocument,
    "query GetMenu {\n  menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        databaseId\n        url\n        label\n        parentDatabaseId\n        menuFields {\n          mega\n          column\n        }\n        childItems {\n          nodes {\n            id\n          }\n        }\n      }\n    }\n  }\n}": types.GetMenuDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"): (typeof documents)["fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n      value\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n      value\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"): (typeof documents)["fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}"): (typeof documents)["fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  displayName\n  email\n  orderCount\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  date\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}"): (typeof documents)["fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}"): (typeof documents)["fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}"): (typeof documents)["fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}"): (typeof documents)["fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"): (typeof documents)["fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: \"_product_addons\") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}"): (typeof documents)["fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: \"_product_addons\") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"): (typeof documents)["fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"): (typeof documents)["fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"): (typeof documents)["fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"): (typeof documents)["fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}"): (typeof documents)["fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"): (typeof documents)["fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"): (typeof documents)["fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n}"): (typeof documents)["fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"): (typeof documents)["fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"): (typeof documents)["mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"): (typeof documents)["mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"): (typeof documents)["mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"): (typeof documents)["mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"): (typeof documents)["mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}"): (typeof documents)["mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddToCart($input: AddToCartInput!) {\n    addToCart(input: $input) {\n      cart {\n        isEmpty\n        contents {\n          itemCount\n          productCount\n          edges {\n            node {\n              extraData {\n                key\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddToCart($input: AddToCartInput!) {\n    addToCart(input: $input) {\n      cart {\n        isEmpty\n        contents {\n          itemCount\n          productCount\n          edges {\n            node {\n              extraData {\n                key\n                value\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ClearCart($input: EmptyCartInput!) {\n    emptyCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ClearCart($input: EmptyCartInput!) {\n    emptyCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n    removeItemsFromCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n    removeItemsFromCart(input: $input) {\n      clientMutationId\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n    updateItemQuantities(input: $input) {\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n    updateItemQuantities(input: $input) {\n      cart {\n        ...CartBase\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Checkout($input: CheckoutInput!) {\n    checkout(input: $input) {\n      customer {\n        ...CustomerBase\n      }\n      order {\n        ...OrderProductBase\n      }\n      result\n    }\n  }\n"): (typeof documents)["\n  mutation Checkout($input: CheckoutInput!) {\n    checkout(input: $input) {\n      customer {\n        ...CustomerBase\n      }\n      order {\n        ...OrderProductBase\n      }\n      result\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: \"home\", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLink {\n          title\n          provider\n          videoId\n          videoUrl\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}"): (typeof documents)["query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: \"home\", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLink {\n          title\n          provider\n          videoId\n          videoUrl\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetMenu {\n  menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        databaseId\n        url\n        label\n        parentDatabaseId\n        menuFields {\n          mega\n          column\n        }\n        childItems {\n          nodes {\n            id\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetMenu {\n  menu(id: \"main\", idType: SLUG) {\n    id\n    menuItems(first: 100) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        databaseId\n        url\n        label\n        parentDatabaseId\n        menuFields {\n          mega\n          column\n        }\n        childItems {\n          nodes {\n            id\n          }\n        }\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;