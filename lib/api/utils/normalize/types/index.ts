import { Maybe, Scalars } from "@api/gql/types"

export type NormalizedImage = {
  url: string
  altText: string
  mimeType: string
  size: number
  width: number
  height: number
}

export type IconStyle =
  | "brands"
  | "duotone"
  | "light"
  | "regular"
  | "solid"
  | undefined

export type NormalizedCard = {
  title: string
  content: string
  icon: {
    name: string
    style?: IconStyle
  }
}

export type NormalizedLinkCard = NormalizedCard & {
  link: {
    url: string
    text: string
  }
}

export type NormalizedImageCard = NormalizedCard & {
  image: NormalizedImage
}

export type NormalizedSupplier = {
  name: string
  slug: string
  url: string
  description: string
  logo: {
    url: string
    size: number
    height: number
    width: number
  }
}

export type NormalizedCallout = {
  style: string
  content: string
}

export type NormalizedEmployeeContact = {
  office?: Maybe<Scalars["String"]>
  fax?: Maybe<Scalars["String"]>
  email: string
  address?: Maybe<Scalars["String"]>
  orders?: Maybe<Scalars["String"]>
}

export type NormalizedEmployee = {
  name: string
  slug: string
  contact: NormalizedEmployeeContact
  position: string
  departments: string[]
}

export type NormalizedSalesRep = NormalizedEmployee & {
  regions?: string
}
