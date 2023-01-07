import { gql } from "urql"

const getConsultingDataQuery = gql`
  query GetConsultingData {
    page(id: "consulting", idType: URI) {
      ...PageCommonBase
      page_consulting {
        acf {
          slides {
            image {
              ...ImageBase
            }
          }
          content
          callout {
            content
            style
          }
          cards {
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
          certificates {
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
  }
`
