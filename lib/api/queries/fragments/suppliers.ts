import { imageFragment } from "."

export const supplierBaseFragment = `
title
slug
supplier {
  url
  text
  ${imageFragment}
}
`

export const suppliersFragment = `
suppliers(first: 99) {
  nodes {
    ${supplierBaseFragment}
  }
}`

export const featuredSupplierFragment = `
featuredSupplier {
  ... on Supplier {
    ${supplierBaseFragment}
  }
}`
