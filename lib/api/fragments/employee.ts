import { gql } from "urql"

const employeeCommonFragment = gql`
  fragment EmployeeBase on Employee {
    id
    databaseId
    slug
    title
    position {
      position
    }
    departments {
      nodes {
        name
      }
    }
    contact {
      contact {
        office
        fax
        email
        address
        orders
      }
    }
  }
`

const salesRepsFragment = gql`
  fragment SalesRepFragment on Page_PageAboutContact_Acf {
    salesReps {
      ... on Employee {
        ...EmployeeBase
        regions {
          regions
        }
      }
    }
  }
`
