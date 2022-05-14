import { gql } from "urql"

const getContactDataQuery = gql`
  query GetContactData {
    page(id: "about/contact", idType: URI) {
      ...PageCommonBase
      page_about_contact {
        acf {
          ...CardsFragment
          ...SalesRepFragment
          map {
            fieldGroupName
            mapOptions {
              mapType
              mapTypeStyle {
                featureType
                featureTypeChild
                elementTypeChild
                mapTypeStyleStylers {
                  color
                  gamma
                  saturation
                }
              }
              center {
                lat
                lng
              }
              zoom
              defaultUi
              keyboardShortcuts
            }
            markers {
              label
              center {
                lat
                lng
              }
              icon {
                name
                type
              }
            }
          }
        }
      }
    }
  }
`
