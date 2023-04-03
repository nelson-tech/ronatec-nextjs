import { render } from "@testing-library/react"
import IconCard, { PropsType } from "@components/Cards/Icon/IconCard"

const defaultProps: PropsType = {
  card: { title: "Icon Card", content: "This is the card content." },
}

// Mock Icon component
jest.mock("@components/ui/Icon", () => () => {
  return <div></div>
})

describe("Icon Card", () => {
  it("Should render with default props", () => {
    const { getByTestId } = render(<IconCard {...defaultProps} />)
    const element = getByTestId("icon-card")
    expect(element).toBeTruthy()
  })

  it("Should render with centered text", () => {
    const { getByTestId } = render(
      <IconCard {...{ card: { ...defaultProps.card }, centerText: true }} />
    )
    const element = getByTestId("icon-card")
    expect(element).toBeTruthy()
  })

  it("Should render with icon", () => {
    const { getByTestId } = render(
      <IconCard
        {...{ card: { ...defaultProps.card, icon: { name: "icon-name" } } }}
      />
    )
    const element = getByTestId("icon-card")
    expect(element).toBeTruthy()
  })
})
