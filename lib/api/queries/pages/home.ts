import { gql } from "urql"

const getHomeDataQuery = gql`
  query GetHomeData {
    page(id: "home", idType: URI) {
      ...PageCommonBase
      page_home {
        acf {
          hero {
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
          videoLink {
            title
            provider
            videoId
            videoUrl
          }
          ...FeaturedSupplierFragment
        }
      }
    }
  }
`
