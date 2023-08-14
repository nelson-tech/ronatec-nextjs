import { render } from "@testing-library/react"
import EmployeeCard, {
  PropsType,
} from "app/about/contact/EmployeeCard"

const defaultProps: PropsType = {
  employee: {
    id: "employee",
    databaseId: 42,
    employeeId: 43,
    isContentNode: false,
    isTermNode: false,
    contentTypeName: "employee",
  },
}

// Mock Icon component
jest.mock("@components/ui/Icon", () => () => {
  return <div></div>
})

describe("Employee Card", () => {
  it("Should render with default props", () => {
    const { getByTestId } = render(<EmployeeCard {...defaultProps} />)
    const element = getByTestId("employee-card")
    expect(element).toBeTruthy()
  })

  it("Should render with title", () => {
    const { getByTestId } = render(
      <EmployeeCard
        {...{ employee: { ...defaultProps.employee, title: "Sales Manager" } }}
      />
    )
    const element = getByTestId("employee-card")
    expect(element).toBeTruthy()
  })

  it("Should render with contact info (email only)", () => {
    const { getByTestId } = render(
      <EmployeeCard
        {...{
          employee: {
            ...defaultProps.employee,
            title: "Sales Manager",
            contact: { contact: { email: "john@doe.com" } },
          },
        }}
      />
    )
    const element = getByTestId("employee-card")
    expect(element).toBeTruthy()
  })

  it("Should render with contact info (email and office phone)", () => {
    const { getByTestId } = render(
      <EmployeeCard
        {...{
          employee: {
            ...defaultProps.employee,
            title: "Sales Manager",
            contact: { contact: { email: "john@doe.com", office: "555-1234" } },
          },
        }}
      />
    )
    const element = getByTestId("employee-card")
    expect(element).toBeTruthy()
  })

  it("Should render with regions", () => {
    const { getByTestId } = render(
      <EmployeeCard
        {...{
          employee: {
            ...defaultProps.employee,
            regions: { regions: "San Diego" },
          },
        }}
      />
    )
    const element = getByTestId("employee-card")
    expect(element).toBeTruthy()
  })
})
