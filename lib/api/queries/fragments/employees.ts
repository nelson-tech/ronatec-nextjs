export const employeeCommonFragment = `
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
`

export const salesRepsFragment = `
salesReps {
  ... on Employee {
    ${employeeCommonFragment}
    regions {
      regions
    }
  }
}
`
