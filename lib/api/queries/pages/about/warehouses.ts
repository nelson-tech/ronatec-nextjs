import { gql } from "urql"

const getWarehousesDataQuery = gql`
  query GetWarehousesData {
    page(id: "about/warehouses", idType: URI) {
      ...PageCommonBase
      page_about_warehouses {
        acf {
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
