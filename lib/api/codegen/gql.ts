/* eslint-disable */
import * as types from "./graphql"
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}":
    types.CartBaseFragmentDoc,
  "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}":
    types.CartItemFragmentDoc,
  "fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}":
    types.CardsFragmentFragmentDoc,
  "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}":
    types.ImageBaseFragmentDoc,
  "fragment CustomerAddresses on Customer {\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}":
    types.CustomerAddressesFragmentDoc,
  "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  email\n  orderCount\n  sessionToken\n}":
    types.CustomerBaseFragmentDoc,
  "fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}":
    types.EmployeeBaseFragmentDoc,
  "fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}":
    types.SalesRepFragmentFragmentDoc,
  "fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}":
    types.OrderProductBaseFragmentDoc,
  "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}":
    types.PageCommonBaseFragmentDoc,
  "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}":
    types.ProductAttributeBaseFragmentDoc,
  'fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: "_product_addons") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}':
    types.ProductBaseFragmentDoc,
  "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}":
    types.ProductCategoryBaseFragmentDoc,
  "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}":
    types.ProductMinBaseFragmentDoc,
  "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}":
    types.ProductPriceBaseFragmentDoc,
  "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}":
    types.ProductVariationBaseFragmentDoc,
  "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}":
    types.SimpleProductFragmentFragmentDoc,
  "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}":
    types.VariableProductFragmentFragmentDoc,
  "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}":
    types.VariationAttributeBaseFragmentDoc,
  "fragment SEOBase on Page {\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}":
    types.SeoBaseFragmentDoc,
  "fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}":
    types.FeaturedSupplierFragmentFragmentDoc,
  "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}":
    types.UserAuthBaseFragmentDoc,
  "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}":
    types.UserFragmentDoc,
  "mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}":
    types.CheckoutDocument,
  "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}":
    types.LoginUserDocument,
  "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}":
    types.LogoutUserDocument,
  "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}":
    types.RefreshAuthTokenDocument,
  "mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}":
    types.RegisterCustomerDocument,
  "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}":
    types.RegisterUserDocument,
  "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}":
    types.ResetUserPasswordDocument,
  "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}":
    types.SendPasswordResetEmailDocument,
  "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}":
    types.AddToCartDocument,
  "mutation ClearCart($input: EmptyCartInput!) {\n  emptyCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}":
    types.ClearCartDocument,
  "mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}":
    types.RemoveCartItemDocument,
  "mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}":
    types.UpdateCartItemQuantityDocument,
  'query GetAboutData {\n  page(id: "about", idType: URI) {\n    ...PageCommonBase\n    page_about {\n      acf {\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetAboutDataDocument,
  "query GetCart {\n  cart {\n    ...CartBase\n  }\n}": types.GetCartDocument,
  "query GetCategoryDataBySlug($slug: ID!) {\n  productCategory(id: $slug, idType: SLUG) {\n    ...ProductCategoryBase\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}":
    types.GetCategoryDataBySlugDocument,
  "query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}":
    types.GetCategorySlugsDocument,
  'query GetConsultingData {\n  page(id: "consulting", idType: URI) {\n    ...PageCommonBase\n    page_consulting {\n      acf {\n        slides {\n          image {\n            ...ImageBase\n          }\n        }\n        content\n        callout {\n          content\n          style\n        }\n        cards {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        certificates {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetConsultingDataDocument,
  'query GetContactData {\n  page(id: "about/contact", idType: URI) {\n    ...PageCommonBase\n    page_about_contact {\n      acf {\n        ...CardsFragment\n        ...SalesRepFragment\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetContactDataDocument,
  "query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}":
    types.GetCustomerDataDocument,
  "query GetDistributionData {\n  suppliers(first: 99) {\n    nodes {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}":
    types.GetDistributionDataDocument,
  'query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: "home", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLinks {\n          videoLink {\n            title\n            provider\n            videoId\n            videoUrl\n            placeholder {\n              ...ImageBase\n            }\n            videoFile {\n              ...ImageBase\n            }\n          }\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}':
    types.GetHomeDataDocument,
  'query GetMainMenu {\n  menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetMainMenuDocument,
  'query GetMenus {\n  mainMenu: menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  mobileMenu: menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetMenusDocument,
  'query GetMobileMenu {\n  menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetMobileMenuDocument,
  "query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    ...OrderProductBase\n  }\n}":
    types.GetOrderDataByIdDocument,
  "query GetOrdersData {\n  orders {\n    nodes {\n      ...OrderProductBase\n    }\n  }\n}":
    types.GetOrdersDataDocument,
  "query GetProductCategoriesData {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}":
    types.GetProductCategoriesDataDocument,
  "query GetProductCategoriesSlugs {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      slug\n    }\n  }\n}":
    types.GetProductCategoriesSlugsDocument,
  "query GetProductDataBySlug($slug: ID!) {\n  product(id: $slug, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n  }\n}":
    types.GetProductDataBySlugDocument,
  "query GetProductsDataByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}":
    types.GetProductsDataByCategoryDocument,
  "query GetProductsSlugs {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}":
    types.GetProductsSlugsDocument,
  "query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}":
    types.GetProductsWithCategoriesDocument,
  "query GetViewer {\n  viewer {\n    ...UserAuthBase\n  }\n}":
    types.GetViewerDocument,
  'query GetWarehousesData {\n  page(id: "about/warehouses", idType: URI) {\n    ...PageCommonBase\n    page_about_warehouses {\n      acf {\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.GetWarehousesDataDocument,
  "query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}":
    types.QuickSearchDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"
): (typeof documents)["fragment CartBase on Cart {\n  contentsTotal\n  isEmpty\n  subtotal\n  total\n  contents {\n    itemCount\n    productCount\n    nodes {\n      ...CartItem\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["fragment CartItem on CartItem {\n  quantity\n  subtotal\n  total\n  variation {\n    attributes {\n      ...VariationAttributeBase\n    }\n  }\n  key\n  product {\n    node {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}"
): (typeof documents)["fragment CardsFragment on Page_PageAboutContact_Acf {\n  cards {\n    title\n    content\n    icon {\n      name\n      type\n    }\n    image {\n      ...ImageBase\n    }\n    link {\n      url\n      label\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"
): (typeof documents)["fragment ImageBase on MediaItem {\n  id\n  databaseId\n  altText\n  sourceUrl\n  mimeType\n  mediaDetails {\n    height\n    width\n  }\n  fileSize\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CustomerAddresses on Customer {\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}"
): (typeof documents)["fragment CustomerAddresses on Customer {\n  billing {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n  shipping {\n    address1\n    address2\n    city\n    company\n    country\n    email\n    firstName\n    lastName\n    phone\n    postcode\n    state\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  email\n  orderCount\n  sessionToken\n}"
): (typeof documents)["fragment CustomerBase on Customer {\n  id\n  firstName\n  lastName\n  email\n  orderCount\n  sessionToken\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}"
): (typeof documents)["fragment EmployeeBase on Employee {\n  id\n  databaseId\n  slug\n  title\n  position {\n    position\n  }\n  departments {\n    nodes {\n      name\n    }\n  }\n  contact {\n    contact {\n      office\n      fax\n      email\n      address\n      orders\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}"
): (typeof documents)["fragment SalesRepFragment on Page_PageAboutContact_Acf {\n  salesReps {\n    ... on Employee {\n      ...EmployeeBase\n      regions {\n        regions\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["fragment OrderProductBase on Order {\n  date\n  orderNumber\n  total\n  status\n  lineItems {\n    nodes {\n      quantity\n      total\n      product {\n        node {\n          ...SimpleProductFragment\n          ...VariableProductFragment\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}"
): (typeof documents)["fragment PageCommonBase on Page {\n  id\n  databaseId\n  title\n  slug\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"
): (typeof documents)["fragment ProductAttributeBase on ProductAttribute {\n  id\n  attributeId\n  name\n  label\n  options\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: "_product_addons") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}'
): (typeof documents)['fragment ProductBase on Product {\n  ...ProductMinBase\n  metaData(keysIn: "_product_addons") {\n    key\n    value\n  }\n  dateOnSaleFrom\n  dateOnSaleTo\n  description\n  shortDescription\n  productCategories {\n    nodes {\n      name\n      slug\n      ancestors {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n  image {\n    ...ImageBase\n  }\n  galleryImages {\n    nodes {\n      ...ImageBase\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"
): (typeof documents)["fragment ProductCategoryBase on ProductCategory {\n  name\n  slug\n  id\n  count\n  description\n  image {\n    ...ImageBase\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"
): (typeof documents)["fragment ProductMinBase on Product {\n  id\n  databaseId\n  name\n  slug\n  type\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"
): (typeof documents)["fragment ProductPriceBase on Product {\n  ... on VariableProduct {\n    price\n    salePrice\n  }\n  ... on SimpleProduct {\n    price\n    salePrice\n  }\n  ... on GroupProduct {\n    price\n  }\n  ... on ExternalProduct {\n    price\n    salePrice\n  }\n  onSale\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"
): (typeof documents)["fragment ProductVariationBase on ProductVariation {\n  sku\n  id\n  databaseId\n  description\n  name\n  price\n  salePrice\n  onSale\n  dateOnSaleFrom\n  dateOnSaleTo\n  image {\n    ...ImageBase\n  }\n  attributes {\n    nodes {\n      ...VariationAttributeBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}"
): (typeof documents)["fragment SimpleProductFragment on SimpleProduct {\n  ... on SimpleProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"
): (typeof documents)["fragment VariableProductFragment on VariableProduct {\n  ... on VariableProduct {\n    ...ProductBase\n    price\n    salePrice\n    onSale\n    variations {\n      nodes {\n        ...ProductVariationBase\n      }\n    }\n    attributes {\n      nodes {\n        ...ProductAttributeBase\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"
): (typeof documents)["fragment VariationAttributeBase on VariationAttribute {\n  id\n  attributeId\n  name\n  label\n  value\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment SEOBase on Page {\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}"
): (typeof documents)["fragment SEOBase on Page {\n  seo {\n    title\n    description\n    focusKeywords\n    openGraph {\n      articleMeta {\n        section\n      }\n      description\n      locale\n      siteName\n      title\n      type\n      url\n      slackEnhancedData {\n        data\n        label\n      }\n      twitterMeta {\n        card\n        description\n        title\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["fragment FeaturedSupplierFragment on Page_PageHome_Acf {\n  featuredSupplier {\n    ... on Supplier {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}"
): (typeof documents)["fragment UserAuthBase on User {\n  id\n  databaseId\n  jwtAuthToken\n  jwtRefreshToken\n  firstName\n  lastName\n  username\n  email\n  wooSessionToken\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"
): (typeof documents)["fragment User on User {\n  id\n  databaseId\n  firstName\n  lastName\n  username\n  email\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}"
): (typeof documents)["mutation Checkout($input: CheckoutInput!) {\n  checkout(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    order {\n      ...OrderProductBase\n    }\n    result\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"
): (typeof documents)["mutation LoginUser($input: LoginInput!) {\n  login(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"
): (typeof documents)["mutation LogoutUser($input: LogoutInput!) {\n  logout(input: $input) {\n    status\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"
): (typeof documents)["mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {\n  refreshJwtAuthToken(input: $input) {\n    authToken\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"
): (typeof documents)["mutation RegisterCustomer($input: RegisterCustomerInput!) {\n  registerCustomer(input: $input) {\n    customer {\n      ...CustomerBase\n    }\n    authToken\n    refreshToken\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"
): (typeof documents)["mutation RegisterUser($input: RegisterUserInput!) {\n  registerUser(input: $input) {\n    user {\n      ...UserAuthBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"
): (typeof documents)["mutation ResetUserPassword($key: String!, $login: String!, $password: String!) {\n  resetUserPassword(input: {key: $key, login: $login, password: $password}) {\n    clientMutationId\n    user {\n      ...UserAuthBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}"
): (typeof documents)["mutation SendPasswordResetEmail($username: String!) {\n  sendPasswordResetEmail(input: {username: $username}) {\n    clientMutationId\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"
): (typeof documents)["mutation AddToCart($input: AddToCartInput!) {\n  addToCart(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ClearCart($input: EmptyCartInput!) {\n  emptyCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"
): (typeof documents)["mutation ClearCart($input: EmptyCartInput!) {\n  emptyCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"
): (typeof documents)["mutation RemoveCartItem($input: RemoveItemsFromCartInput!) {\n  removeItemsFromCart(input: $input) {\n    clientMutationId\n    cart {\n      ...CartBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"
): (typeof documents)["mutation UpdateCartItemQuantity($input: UpdateItemQuantitiesInput!) {\n  updateItemQuantities(input: $input) {\n    cart {\n      ...CartBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetAboutData {\n  page(id: "about", idType: URI) {\n    ...PageCommonBase\n    page_about {\n      acf {\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetAboutData {\n  page(id: "about", idType: URI) {\n    ...PageCommonBase\n    page_about {\n      acf {\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetCart {\n  cart {\n    ...CartBase\n  }\n}"
): (typeof documents)["query GetCart {\n  cart {\n    ...CartBase\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetCategoryDataBySlug($slug: ID!) {\n  productCategory(id: $slug, idType: SLUG) {\n    ...ProductCategoryBase\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}"
): (typeof documents)["query GetCategoryDataBySlug($slug: ID!) {\n  productCategory(id: $slug, idType: SLUG) {\n    ...ProductCategoryBase\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n    ancestors {\n      nodes {\n        id\n        databaseId\n        name\n        slug\n      }\n    }\n    children(where: {hideEmpty: false}) {\n      nodes {\n        ...ProductCategoryBase\n        products {\n          nodes {\n            ...ProductMinBase\n          }\n        }\n        children(where: {hideEmpty: true}) {\n          nodes {\n            ...ProductCategoryBase\n            products {\n              nodes {\n                ...ProductMinBase\n              }\n            }\n          }\n        }\n      }\n    }\n    products {\n      nodes {\n        ...ProductMinBase\n        image {\n          ...ImageBase\n        }\n        ...ProductPriceBase\n        shortDescription\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}"
): (typeof documents)["query GetCategorySlugs {\n  productCategories(first: 200) {\n    nodes {\n      slug\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetConsultingData {\n  page(id: "consulting", idType: URI) {\n    ...PageCommonBase\n    page_consulting {\n      acf {\n        slides {\n          image {\n            ...ImageBase\n          }\n        }\n        content\n        callout {\n          content\n          style\n        }\n        cards {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        certificates {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetConsultingData {\n  page(id: "consulting", idType: URI) {\n    ...PageCommonBase\n    page_consulting {\n      acf {\n        slides {\n          image {\n            ...ImageBase\n          }\n        }\n        content\n        callout {\n          content\n          style\n        }\n        cards {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        certificates {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              ...ImageBase\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetContactData {\n  page(id: "about/contact", idType: URI) {\n    ...PageCommonBase\n    page_about_contact {\n      acf {\n        ...CardsFragment\n        ...SalesRepFragment\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetContactData {\n  page(id: "about/contact", idType: URI) {\n    ...PageCommonBase\n    page_about_contact {\n      acf {\n        ...CardsFragment\n        ...SalesRepFragment\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}"
): (typeof documents)["query GetCustomerData {\n  customer {\n    ...CustomerBase\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetDistributionData {\n  suppliers(first: 99) {\n    nodes {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query GetDistributionData {\n  suppliers(first: 99) {\n    nodes {\n      title\n      slug\n      id\n      databaseId\n      supplier {\n        url\n        text\n        image {\n          ...ImageBase\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: "home", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLinks {\n          videoLink {\n            title\n            provider\n            videoId\n            videoUrl\n            placeholder {\n              ...ImageBase\n            }\n            videoFile {\n              ...ImageBase\n            }\n          }\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}'
): (typeof documents)['query GetHomeData {\n  productCategories(where: {hideEmpty: true}) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      ancestors {\n        nodes {\n          id\n        }\n      }\n    }\n  }\n  products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8) {\n    nodes {\n      id\n      name\n      slug\n      image {\n        id\n        databaseId\n        altText\n        sourceUrl\n        mimeType\n        mediaDetails {\n          height\n          width\n        }\n        fileSize\n      }\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n  page(id: "home", idType: URI) {\n    ...PageCommonBase\n    page_home {\n      acf {\n        hero {\n          cards {\n            title\n            content\n            icon {\n              name\n              type\n            }\n            image {\n              id\n              databaseId\n              altText\n              sourceUrl\n              mimeType\n              mediaDetails {\n                height\n                width\n              }\n              fileSize\n            }\n            link {\n              url\n              label\n            }\n          }\n        }\n        cards {\n          title\n          content\n          icon {\n            name\n            type\n          }\n          image {\n            ...ImageBase\n          }\n          link {\n            url\n            label\n          }\n        }\n        videoLinks {\n          videoLink {\n            title\n            provider\n            videoId\n            videoUrl\n            placeholder {\n              ...ImageBase\n            }\n            videoFile {\n              ...ImageBase\n            }\n          }\n        }\n        ...FeaturedSupplierFragment\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetMainMenu {\n  menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetMainMenu {\n  menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetMenus {\n  mainMenu: menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  mobileMenu: menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetMenus {\n  mainMenu: menu(id: "main", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  mobileMenu: menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetMobileMenu {\n  menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetMobileMenu {\n  menu(id: "mobile", idType: SLUG) {\n    id\n    menuItems(first: 100, where: {parentDatabaseId: 0}) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      nodes {\n        id\n        url\n        label\n        menuFields {\n          mega\n        }\n        childItems {\n          nodes {\n            id\n            url\n            label\n            menuFields {\n              column\n            }\n            childItems {\n              nodes {\n                id\n                url\n                label\n                childItems {\n                  nodes {\n                    id\n                    url\n                    label\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    ...OrderProductBase\n  }\n}"
): (typeof documents)["query GetOrderDataByID($id: ID) {\n  order(id: $id, idType: DATABASE_ID) {\n    ...OrderProductBase\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetOrdersData {\n  orders {\n    nodes {\n      ...OrderProductBase\n    }\n  }\n}"
): (typeof documents)["query GetOrdersData {\n  orders {\n    nodes {\n      ...OrderProductBase\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductCategoriesData {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query GetProductCategoriesData {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      ...ProductCategoryBase\n      ancestors {\n        nodes {\n          ...ProductCategoryBase\n        }\n      }\n      children(where: {hideEmpty: true}, first: 99) {\n        nodes {\n          ...ProductCategoryBase\n          children(where: {hideEmpty: true}, first: 99) {\n            nodes {\n              ...ProductCategoryBase\n            }\n          }\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductCategoriesSlugs {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      slug\n    }\n  }\n}"
): (typeof documents)["query GetProductCategoriesSlugs {\n  productCategories(where: {hideEmpty: true}, first: 99) {\n    nodes {\n      slug\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductDataBySlug($slug: ID!) {\n  product(id: $slug, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query GetProductDataBySlug($slug: ID!) {\n  product(id: $slug, idType: SLUG) {\n    ...VariableProductFragment\n    ...SimpleProductFragment\n    seo {\n      title\n      description\n      focusKeywords\n      openGraph {\n        articleMeta {\n          section\n        }\n        description\n        locale\n        siteName\n        title\n        type\n        url\n        slackEnhancedData {\n          data\n          label\n        }\n        twitterMeta {\n          card\n          description\n          title\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductsDataByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"
): (typeof documents)["query GetProductsDataByCategory($field: ProductsOrderByEnum!, $order: OrderEnum!, $categories: [String]!, $first: Int, $last: Int, $after: String, $before: String) {\n  products(\n    where: {orderby: {field: $field, order: $order}, categoryIn: $categories}\n    first: $first\n    last: $last\n    after: $after\n    before: $before\n  ) {\n    nodes {\n      ...ProductMinBase\n      image {\n        ...ImageBase\n      }\n      productCategories {\n        nodes {\n          id\n          slug\n          name\n        }\n      }\n      ...ProductPriceBase\n      shortDescription\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductsSlugs {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query GetProductsSlugs {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query GetProductsWithCategories {\n  products(first: 200) {\n    nodes {\n      slug\n      productCategories {\n        nodes {\n          ...ProductCategoryBase\n          ancestors {\n            nodes {\n              name\n              slug\n            }\n          }\n        }\n      }\n    }\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetViewer {\n  viewer {\n    ...UserAuthBase\n  }\n}"
): (typeof documents)["query GetViewer {\n  viewer {\n    ...UserAuthBase\n  }\n}"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query GetWarehousesData {\n  page(id: "about/warehouses", idType: URI) {\n    ...PageCommonBase\n    page_about_warehouses {\n      acf {\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['query GetWarehousesData {\n  page(id: "about/warehouses", idType: URI) {\n    ...PageCommonBase\n    page_about_warehouses {\n      acf {\n        map {\n          fieldGroupName\n          markers {\n            label\n            center {\n              lat\n              lng\n            }\n            icon {\n              name\n              type\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"
): (typeof documents)["query QuickSearch($search: String) {\n  products(where: {search: $search}) {\n    nodes {\n      id\n      slug\n      name\n      productCategories {\n        nodes {\n          slug\n        }\n      }\n    }\n  }\n}"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
