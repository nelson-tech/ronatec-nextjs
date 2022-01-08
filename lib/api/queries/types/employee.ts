import { Maybe, Scalars } from "@api/gql/types"

export type EmployeeContactType = {
  office: Maybe<Scalars["String"]>
  fax: Maybe<Scalars["String"]>
  email: Maybe<Scalars["String"]>
  address: Maybe<Scalars["String"]>
  orders: Maybe<Scalars["String"]>
}

export type EmployeeDepartmentType = {
  name: Maybe<Scalars["String"]>
}

export type EmployeeCommonType = {
  slug: Maybe<Scalars["String"]>
  title: Maybe<Scalars["String"]>
  contact: { contact: EmployeeContactType }
  departments: { nodes: EmployeeDepartmentType[] }
  position: {
    position: Maybe<Scalars["String"]>
  }
}

export type SalesRepType = EmployeeCommonType & {
  regions: {
    regions: Maybe<Scalars["String"]>
  }
}
