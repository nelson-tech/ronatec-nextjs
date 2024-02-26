/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export type ProductAttributes = {
  label?: string
  value?: string
  id?: string
}[]
export type WCImages = {
  wc_id?: number
  src?: string
  alt?: string
  probe?: WCImageProbe
  id?: string
}[]
export type ProductItems = {
  product: string | Product
  variation?: {
    name?: string
    option?: string
    id?: string
  }[]
  title: string
  prices?: Prices
  totals?: PriceTotals
  discount?: {
    type?: "amount" | "percentage"
  }
  quantity: number
  id?: string
}[]
export type OrderComments = {
  name?: string
  date?: string
  comment?: string
  id?: string
}[]
export type VideoLink = {
  title?: string
  provider?: "direct" | "youtube" | "other"
  video?: string | Video
  videoId?: string
  url?: string
  placeholderImage?: string | Image
  id?: string
}[]
export type ConsultingSlides = {
  label?: string
  image?: string | Image
  id?: string
}[]
export type Card = {
  title?: string
  content?: string
  image?: string | Image
  icon?: {
    name?: string
    type?: "brand" | "duotone" | "light" | "regular" | "solid"
  }
  link?: {
    label?: string
    url?: string
  }
  id?: string
}[]
export type MapMarker = {
  label?: string
  lat?: number
  lon?: number
  icon?: {
    name?: string
    type?: "brand" | "duotone" | "light" | "regular" | "solid"
  }
  id?: string
}[]
export type MainMenuLink = {
  link: {
    megaColumn?: boolean
    header?: boolean
    type?: "custom" | "reference" | "textOnly"
    reference?:
      | {
          value: string | Product
          relationTo: "products"
        }
      | {
          value: string | Category
          relationTo: "categories"
        }
    url?: string
    label: string
    newTab?: boolean
    megaMenu?: boolean
    children?: {
      megaColumn?: boolean
      header?: boolean
      type?: "custom" | "reference" | "textOnly"
      reference?:
        | {
            value: string | Product
            relationTo: "products"
          }
        | {
            value: string | Category
            relationTo: "categories"
          }
      url?: string
      label: string
      newTab?: boolean
      megaMenu?: boolean
      children?: {
        megaColumn?: boolean
        header?: boolean
        type?: "custom" | "reference" | "textOnly"
        reference?:
          | {
              value: string | Product
              relationTo: "products"
            }
          | {
              value: string | Category
              relationTo: "categories"
            }
        url?: string
        label: string
        newTab?: boolean
        megaMenu?: boolean
        children?: {
          megaColumn?: boolean
          header?: boolean
          type?: "custom" | "reference" | "textOnly"
          reference?:
            | {
                value: string | Product
                relationTo: "products"
              }
            | {
                value: string | Category
                relationTo: "categories"
              }
          url?: string
          label: string
          newTab?: boolean
          megaMenu?: boolean
          id?: string
        }[]
        id?: string
      }[]
      id?: string
    }[]
  }
  id?: string
}[]
export type MobileMenuLink = {
  link: {
    type?: "custom" | "reference" | "textOnly"
    reference?:
      | {
          value: string | Product
          relationTo: "products"
        }
      | {
          value: string | Category
          relationTo: "categories"
        }
    url?: string
    label: string
    newTab?: boolean
    children?: {
      type?: "custom" | "reference" | "textOnly"
      reference?:
        | {
            value: string | Product
            relationTo: "products"
          }
        | {
            value: string | Category
            relationTo: "categories"
          }
      url?: string
      label: string
      newTab?: boolean
      children?: {
        type?: "custom" | "reference" | "textOnly"
        reference?:
          | {
              value: string | Product
              relationTo: "products"
            }
          | {
              value: string | Category
              relationTo: "categories"
            }
        url?: string
        label: string
        newTab?: boolean
        id?: string
      }[]
      id?: string
    }[]
  }
  id?: string
}[]

export interface Config {
  collections: {
    pages: Page
    images: Image
    videos: Video
    productImages: ProductImage
    documents: Document
    products: Product
    categories: Category
    tags: Tag
    carts: Cart
    orders: Order
    users: User
    employees: Employee
    suppliers: Supplier
    forms: Form
    "form-submissions": FormSubmission
  }
  globals: {
    home: Home
    consulting: Consulting
    about: About
    contact: Contact
    warehouses: Warehouse
    menus: Menu
    settings: Settings
  }
}
export interface Page {
  id: string
  title: string
  layout: {
    form: string | Form
    enableIntro?: boolean
    introContent: {
      [k: string]: unknown
    }[]
    id?: string
    blockName?: string
    blockType: "formBlock"
  }[]
  slug?: string
  updatedAt: string
  createdAt: string
  _status?: "draft" | "published"
}
export interface Form {
  id: string
  title: string
  fields?: (
    | {
        name: string
        label?: string
        width?: number
        defaultValue?: string
        required?: boolean
        id?: string
        blockName?: string
        blockType: "text"
      }
    | {
        name: string
        label?: string
        width?: number
        defaultValue?: string
        required?: boolean
        id?: string
        blockName?: string
        blockType: "textarea"
      }
    | {
        name: string
        label?: string
        width?: number
        defaultValue?: string
        options?: {
          label: string
          value: string
          id?: string
        }[]
        required?: boolean
        id?: string
        blockName?: string
        blockType: "select"
      }
    | {
        name: string
        label?: string
        width?: number
        required?: boolean
        id?: string
        blockName?: string
        blockType: "email"
      }
    | {
        name: string
        label?: string
        width?: number
        required?: boolean
        id?: string
        blockName?: string
        blockType: "state"
      }
    | {
        name: string
        label?: string
        width?: number
        required?: boolean
        id?: string
        blockName?: string
        blockType: "country"
      }
    | {
        name: string
        label?: string
        width?: number
        defaultValue?: number
        required?: boolean
        id?: string
        blockName?: string
        blockType: "number"
      }
    | {
        name: string
        label?: string
        width?: number
        required?: boolean
        defaultValue?: boolean
        id?: string
        blockName?: string
        blockType: "checkbox"
      }
    | {
        message?: {
          [k: string]: unknown
        }[]
        id?: string
        blockName?: string
        blockType: "message"
      }
  )[]
  submitButtonLabel?: string
  confirmationType?: "message" | "redirect"
  confirmationMessage: {
    [k: string]: unknown
  }[]
  redirect?: {
    url: string
  }
  emails?: {
    emailTo?: string
    cc?: string
    bcc?: string
    replyTo?: string
    emailFrom?: string
    subject: string
    message?: {
      [k: string]: unknown
    }[]
    id?: string
  }[]
  updatedAt: string
  createdAt: string
}
export interface Image {
  id: string
  alt: string
  prefix?: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface Video {
  id: string
  alt: string
  prefix?: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface ProductImage {
  id: string
  alt: string
  prefix?: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface Document {
  id: string
  alt: string
  prefix?: string
  updatedAt: string
  createdAt: string
  url?: string
  filename?: string
  mimeType?: string
  filesize?: number
  width?: number
  height?: number
}
export interface Product {
  id: string
  title: string
  slug?: string
  shortDescription?: string
  description?: {
    [k: string]: unknown
  }[]
  attributes?: ProductAttributes
  gallery?: {
    image?: string | ProductImage
    id?: string
  }[]
  variations?: {
    name?: string
    slug?: string
    options?: {
      label?: string
      sku?: string
      id?: string
    }[]
    id?: string
  }[]
  hasVariation?: boolean
  purchaseNote?: string
  saleStartDate?: string
  saleEndDate?: string
  isTaxable?: boolean
  taxClass?: string
  downloadable?: boolean
  downloadLimit?: number
  downloadExpiry?: number
  upsellIds?: string[] | Product[]
  crossSellIds?: string[] | Product[]
  relatedIds?: string[] | Product[]
  sku?: string
  manageStock?: boolean
  stock?: number
  used?: boolean
  inStock?: boolean
  shippingRequired?: boolean
  shippingTaxable?: boolean
  shippingClass?: string
  weight?: string
  dimensions?: {
    length?: string
    width?: string
    height?: string
  }
  wc?: {
    wc_id?: number
    description?: string
    images?: WCImages
    attributes?: {
      wc_id?: number
      name?: string
      taxonomy?: string
      has_variations?: boolean
      terms?: {
        wc_id?: number
        name?: string
        slug?: string
        id?: string
      }[]
      id?: string
    }[]
  }
  ordered?: number
  sold?: number
  featured?: boolean
  type?: "simple" | "variable" | "grouped" | "virtual"
  featuredImage?: string | ProductImage
  categories?: string[] | Category[]
  tags?: string[] | Tag[]
  prices?: Prices
  onSale?: boolean
  meta?: Meta
  lanco?: boolean
  updatedAt: string
  createdAt: string
  _status?: "draft" | "published"
}
export interface WCImageProbe {
  width?: number
  height?: number
  length?: number
  type?: string
  mime?: string
  wUnits?: string
  hUnits?: string
  url?: string
  orientation?: number
}
export interface Category {
  id: string
  title?: string
  slug?: string
  image?: string | Image
  lanco?: boolean
  parent?: string | Category
  description?: string
  breadcrumbs?: {
    doc?: string | Category
    url?: string
    label?: string
    id?: string
  }[]
  wc?: {
    wc_id?: number
    parent?: number
    image?: {
      wc_id?: number
      src?: string
      alt?: string
    }
  }
  tags?: string[] | Tag[]
  productCount?: number
  usedProductCount?: number
  updatedAt: string
  createdAt: string
  _status?: "draft" | "published"
}
export interface Tag {
  id: string
  name?: string
  slug?: string
  updatedAt: string
  createdAt: string
}
export interface Prices {
  regularPrice?: number
  salePrice?: number
  price?: number
  formatted?: {
    price?: string
    regularPrice?: string
    salePrice?: string
    price_range?: string
  }
}
export interface Meta {
  title?: string
  description?: string
  image?: string | Image
  keywords?: {
    keyword?: string
    id?: string
  }[]
}
export interface Cart {
  id: string
  items?: ProductItems
  count?: number
  user?: string | User
  totals?: PriceTotals
  coupons?: {
    id?: string
  }[]
  updatedAt: string
  createdAt: string
}
export interface PriceTotals {
  subTotal?: number
  total?: number
  formatted?: {
    subTotal?: string
    total?: string
  }
}
export interface User {
  id: string
  firstName?: string
  lastName?: string
  fullName?: string
  roles?: ("admin" | "customer")[]
  cart?: string | Cart
  orders?: string[] | Order[]
  billing: {
    firstName?: string
    lastName?: string
    company?: string
    phone?: string
    email?: string
    address1?: string
    address2?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
  shipping: {
    firstName?: string
    lastName?: string
    company?: string
    phone?: string
    email?: string
    address1?: string
    address2?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  salt?: string
  hash?: string
  loginAttempts?: number
  lockUntil?: string
  password?: string
}
export interface Order {
  id: string
  fullName?: string
  orderTitle?: string
  orderNumber?: number
  status?: "pending" | "complete" | "cancelled"
  count?: number
  coupons?: {
    id?: string
  }[]
  totals?: PriceTotals
  user?: string | User
  cart?: {
    id?: string
    createdAt?: string
    updatedAt?: string
  }
  items?: ProductItems
  contact: {
    shipToDifferentAddress?: boolean
    billing: {
      firstName?: string
      lastName?: string
      company?: string
      phone?: string
      email?: string
      address1?: string
      address2?: string
      city?: string
      state?: string
      postcode?: string
      country?: string
    }
    shipping: {
      firstName?: string
      lastName?: string
      company?: string
      phone?: string
      email?: string
      address1?: string
      address2?: string
      city?: string
      state?: string
      postcode?: string
      country?: string
    }
  }
  payment: {
    paid?: number
    due?: number
    refunded?: number
  }
  customerNote?: string
  comments?: OrderComments
  updatedAt: string
  createdAt: string
}
export interface Employee {
  id: string
  name?: string
  position?: string
  contact?: {
    email?: string
    phone?: {
      orders?: string
      office?: string
      fax?: string
    }
    address?: string
  }
  regions?: string
  updatedAt: string
  createdAt: string
  _status?: "draft" | "published"
}
export interface Supplier {
  id: string
  title?: string
  description?: string
  image?: string | Image
  url?: string
  updatedAt: string
  createdAt: string
  _status?: "draft" | "published"
}
export interface FormSubmission {
  id: string
  form: string | Form
  submissionData?: {
    field: string
    value: string
    id?: string
  }[]
  updatedAt: string
  createdAt: string
}
export interface Home {
  id: string
  hero: {
    title?: string
    subTitle?: string
    content?: string
    buttons?: {
      label?: string
      url?: string
      className?: string
      id?: string
    }[]
  }
  carousels: {
    categories?: {
      label?: string
      link?: {
        label?: string
        url?: string
      }
      categories?: string[] | Category[]
    }
  }
  cards?: {
    title?: string
    content?: string
    icon?: {
      name?: string
      type?: "brand" | "duotone" | "light" | "regular" | "solid"
    }
    link?: {
      label?: string
      url?: string
    }
    id?: string
  }[]
  videos?: VideoLink
  featuredSupplier?: string | Supplier
  meta?: Meta
  updatedAt?: string
  createdAt?: string
}
export interface Consulting {
  id: string
  slides?: ConsultingSlides
  content?: string
  certificates: {
    cards?: Card
  }
  cards: {
    cards?: Card
  }
  callout?: {
    content?: string
    style?: string
  }
  meta?: Meta
  updatedAt?: string
  createdAt?: string
}
export interface About {
  id: string
  cards?: Card
  meta?: Meta
  updatedAt?: string
  createdAt?: string
}
export interface Contact {
  id: string
  cards?: Card
  map?: Map
  salesReps?: string[] | Employee[]
  meta?: Meta
  updatedAt?: string
  createdAt?: string
}
export interface Map {
  center?: {
    lat?: number
    lon?: number
  }
  markers?: MapMarker
}
export interface Warehouse {
  id: string
  map?: Map
  meta?: Meta
  updatedAt?: string
  createdAt?: string
}
export interface Menu {
  id: string
  mainMenu: {
    links?: MainMenuLink
  }
  mobileMenu: {
    links?: MobileMenuLink
  }
  footerMenu: {
    links?: {
      link: NavLink
      id?: string
    }[]
  }
  updatedAt?: string
  createdAt?: string
}
export interface NavLink {
  type?: "custom" | "reference"
  reference:
    | {
        value: string | Product
        relationTo: "products"
      }
    | {
        value: string | Category
        relationTo: "categories"
      }
  url: string
  label: string
  newTab?: boolean
  megaMenu?: boolean
}
export interface Settings {
  id: string
  seoTitle?: string
  debugEmail?: string
  logos: {
    main?: string | Image
    favIcon?: string | Image
  }
  colors: {
    primary: string
    secondary: string
  }
  promo: {
    html?: string
  }
  orders: {
    adminEmail?: string
    startingNumber?: number
  }
  updatedAt?: string
  createdAt?: string
}
