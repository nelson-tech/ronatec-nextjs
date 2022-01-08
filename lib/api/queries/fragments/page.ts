export const pageCommonFragment = `
  title
  slug
`
export const mainMenuQueryFragment = `
  menu(id: "Main", idType: NAME) {
    name
    menuItems(first: 30, where: { parentId: "null" }) {
      nodes {
        path
        label
        childItems(first: 30) {
          nodes {
            path
            label
            childItems(first: 30) {
              nodes {
                path
                label
              }
            }
          }
        }
      }
    }
  }
`

export const generalPageQuery = `
  ${mainMenuQueryFragment}
`
