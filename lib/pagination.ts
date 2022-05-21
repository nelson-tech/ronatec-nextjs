export type PaginationType = {
  first?: number | null | undefined
  last?: number | null | undefined
  after?: string | null | undefined
  before?: string | null | undefined
}

export const defaultProductsPerPage = 12

export const defaultPagination: PaginationType = {
  first: defaultProductsPerPage,
  last: null,
  after: null,
  before: null,
}
