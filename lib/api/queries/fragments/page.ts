export const pageCommonFragment = `
id
databaseId
title
slug
`

const menuMinFragment = `
id
path
label
`

export const mainMenuQueryFragment = `
  menu(id: "Main", idType: NAME) {
    name
    menuItems(first: 30, where: { parentId: "null" }) {
      nodes {
        ${menuMinFragment}
        menuFields {
          mega
        }
        childItems(first: 30) {
          nodes {
            ${menuMinFragment}
            menuFields {
              column
            }
            childItems(first: 30) {
              nodes {
                ${menuMinFragment}
                childItems(first: 30) {
                  nodes {
                    ${menuMinFragment}
                    childItems(first: 30) {
                      nodes {
                        ${menuMinFragment}
                      }
                    }
                  }
                }
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
