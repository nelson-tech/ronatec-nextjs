import { EmployeeCommonType, SalesRepType } from "@api/queries/types"
import {
  NormalizedEmployee,
  NormalizedEmployeeContact,
  NormalizedSalesRep,
} from "./types"

const error = (field: string): void => {
  console.log(`Employee ${field} not supplied`)
}

const EMPLOYEE_PLACEHOLDER: NormalizedEmployee = {
  name: "John Doe",
  slug: "john-doe",
  contact: {
    email: "john@doe.com",
  },
  departments: ["Mergers & Acquisitions"],
  position: "Scout",
}

const SALES_REP_PLACEHOLDER: NormalizedSalesRep = {
  ...EMPLOYEE_PLACEHOLDER,
  regions: "The Arctic",
}

export const normalizeEmployee = (
  employee: EmployeeCommonType,
): NormalizedEmployee => {
  if (!employee) {
    error("value")
    return EMPLOYEE_PLACEHOLDER
  }

  let name = employee.title
  if (!name) {
    name = EMPLOYEE_PLACEHOLDER.name
    error("name")
  }

  let slug = employee.slug
  if (!slug) {
    slug = EMPLOYEE_PLACEHOLDER.slug
  }

  let departments = employee.departments.nodes.map(departmentObj => {
    let department = departmentObj.name
    if (!department) {
      department = EMPLOYEE_PLACEHOLDER.departments[0]
      error("departments")
    }
    return department
  })

  const { office, email, fax, orders, address } = employee.contact.contact
  if (!email) {
    error("email")
  }
  let contact: NormalizedEmployeeContact = {
    email: email || EMPLOYEE_PLACEHOLDER.contact.email,
  }
  if (office) {
    contact.office = office
  }
  if (fax) {
    contact.fax = fax
  }
  if (orders) {
    contact.orders = orders
  }
  if (address) {
    contact.address = address
  }

  let position = employee.position.position
  if (!position) {
    position = EMPLOYEE_PLACEHOLDER.position
    error("position")
  }

  return {
    name,
    slug,
    departments,
    contact,
    position,
  }
}

export const normalizeEmployees = (
  employees: EmployeeCommonType[],
): NormalizedEmployee[] => {
  if (employees.length < 1) {
    error("array")
    return [EMPLOYEE_PLACEHOLDER]
  }

  const normalizedEmployees = employees.map<NormalizedEmployee>(employee => {
    const normalizedEmployee = normalizeEmployee(employee)
    return normalizedEmployee
  })

  return normalizedEmployees
}

export const normalizeSalesReps = (
  salesReps: SalesRepType[],
): NormalizedSalesRep[] => {
  if (salesReps.length < 1) {
    error("array")
    return [SALES_REP_PLACEHOLDER]
  }

  const normalizedSalesReps = salesReps.map<NormalizedSalesRep>(salesRep => {
    let {
      regions: { regions },
      ...employee
    } = salesRep
    const normalizedEmployee = normalizeEmployee(employee)

    let normalizedSalesRep: NormalizedSalesRep = { ...normalizedEmployee }

    if (regions) {
      normalizedSalesRep.regions = regions
    }

    return normalizedSalesRep
  })

  return normalizedSalesReps
}
