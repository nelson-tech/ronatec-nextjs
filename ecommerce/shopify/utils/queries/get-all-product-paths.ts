const getAllProductPathsQuery = `
  query getAllProductPaths($first: Int = 250) {
    products(first: $first) {
      edges {
        node {
          handle
        }
      }
    }
  }
`

export default getAllProductPathsQuery
