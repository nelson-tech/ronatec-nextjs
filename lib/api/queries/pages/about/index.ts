import { gql } from "urql"

export const getAboutDataQuery = gql`
  query GetAboutData {
    page(id: "about", idType: URI) {
      ...PageCommonBase
      page_about {
        acf {
          cards {
            title
            content
            icon {
              name
              type
            }
            image {
              ...ImageBase
            }
            link {
              url
              label
            }
          }
        }
      }
    }
  }
`
