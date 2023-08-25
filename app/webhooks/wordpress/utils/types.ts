export type MediaCollectionTitles =
  | "images"
  | "videos"
  | "productImages"
  | "documents"

export type WCWH_Resource = "coupon" | "customer" | "order" | "product"

export type WCWH_Event = "created" | "updated" | "deleted" | "restored"
export type WCWH_Category = {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: WCWH_Image
  menu_order: number
  count: number
  _links: WCWH_Links
}

export type WCWH_Collection = {
  href: string
}

export type WCWH_Dimensions = {
  length: string
  width: string
  height: string
}

export type WCWH_MetaDatum = {
  id: number
  key: string
  value: string
}

export type WCWH_Product = {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_created_gmt: string
  date_modified: string
  date_modified_gmt: string
  type: "simple" | "variable" | "grouped"
  status: "draft" | "publish" | "pending"
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_from_gmt: string | null
  date_on_sale_to: string | null
  date_on_sale_to_gmt: string | null
  price_html: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  in_stock: boolean
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: WCWH_Dimensions
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Partial<WCWH_Category>[]
  tags: any[]
  images: WCWH_Image[]
  attributes: Attribute[]
  default_attributes: any[]
  variations: number[]
  grouped_products: any[]
  menu_order: number
  meta_data: WCWH_MetaDatum[]
  _links: WCWH_Links
}

interface LineItem {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: WCWH_MetaData[]
  sku: string
  price: number
}
interface ShippingLine {
  id: number
  method_title: string
  method_id: string
  instance_id: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: any[]
}

interface Meta_Data_Line_Item {
  // built from my own object sending in, disregard if necessary!
  key: string
  value: string
}
interface Cart {
  // built from my own object sending in, disregard if necessary!
  payment_method: string
  payment_method_title: string
  billing: WCWH_Billing
  shipping: WCWH_Shipping
  line_items: Array<LineItem>
  shipping_lines: Array<ShippingLine>
  customer_id: number
  meta_data: Array<Meta_Data_Line_Item>
  set_paid: false
}

interface Attribute {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export type WCWH_Image = {
  id: number
  date_created: Date
  date_created_gmt: Date
  date_modified: Date
  date_modified_gmt: Date
  src: string
  name: string
  alt: string
  position: number
}

export type WCWH_VariationAttribute = {
  id: number
  name: string
  option: string
}

export type WCWH_MetaData = {
  id: number
  key: string
  value: string
}

export type WCWH_Up = {
  href: string
}

export type WCWH_Customer = {
  id: number
  date_created: Date
  date_created_gmt: Date
  date_modified: Date
  date_modified_gmt: Date
  email: string
  first_name: string
  last_name: string
  role: string
  username: string
  billing: WCWH_Billing
  shipping: WCWH_Shipping
  is_paying_customer: boolean
  avatar_url: string
  meta_data: WCWH_MetaData[]
  _links: WCWH_Links
}

export type WCWH_Order = {
  id: number
  parent_id: number
  number: string
  order_key: string
  created_via: string
  version: string
  status: string
  currency: string
  date_created: Date
  date_created_gmt: Date
  date_modified: Date
  date_modified_gmt: Date
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  prices_include_tax: boolean
  customer_id: number
  customer_ip_address: string
  customer_user_agent: string
  customer_note: string
  billing: WCWH_Billing
  shipping: WCWH_Shipping
  payment_method: string
  payment_method_title: string
  transaction_id: string
  date_paid?: any
  date_paid_gmt?: any
  date_completed?: any
  date_completed_gmt?: any
  cart_hash: string
  meta_data: any[]
  line_items: LineItem[]
  tax_lines: any[]
  shipping_lines: ShippingLine[]
  fee_lines: any[]
  coupon_lines: any[]
  refunds: any[]
  _links: WCWH_Links
}

export type WCWH_Links = {
  self: WCWH_Self[]
  collection: WCWH_Collection[]
  up: WCWH_Up[]
}

export type WCWH_Billing = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
  phone: string
}

export type WCWH_Shipping = {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email: string
}

export type WCWH_Variation = {
  id: number
  date_created: Date
  date_created_gmt: Date
  date_modified: Date
  date_modified_gmt: Date
  description: string
  permalink: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from?: any
  date_on_sale_from_gmt?: any
  date_on_sale_to?: any
  date_on_sale_to_gmt?: any
  on_sale: boolean
  visible: boolean
  purchasable: boolean
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity?: any
  in_stock: boolean
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  weight: string
  dimensions: WCWH_Dimensions
  shipping_class: string
  shipping_class_id: number
  image: WCWH_Image
  attributes: WCWH_VariationAttribute[]
  menu_order: number
  meta_data: WCWH_MetaData[]
  _links: WCWH_Links
}

export type WCWH_Self = {
  href: string
}
