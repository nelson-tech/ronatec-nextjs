import { render } from "@testing-library/react"
import Icon, { PropsType } from "@components/ui/Icon/Icon"

const defaultProps: PropsType = {
  name: "Icon name",
  iconKey: "icon-key",
}

jest.mock("@lib/utils/SVGURL", () => ({
  SVGUrl: ({ uri, iconKey }: { uri: string; iconKey: string }) => ({
    loading: false,
    svgEl: <div></div>,
  }),
}))

describe("Icon", () => {
  it("Should render with required props only", () => {
    const { getByTestId } = render(<Icon {...defaultProps} />)
    const element = getByTestId("icon")
    expect(element).toBeTruthy()
  })

  it("Should render with solid type added", () => {
    const { getByTestId } = render(
      <Icon {...{ ...defaultProps, type: "solid" }} />
    )
    const element = getByTestId("icon")
    expect(element).toBeTruthy()
  })

  it("Should render with unavailable type added", () => {
    const { getByTestId } = render(
      <Icon {...{ ...defaultProps, type: "marshmallow" }} />
    )
    const element = getByTestId("icon")
    expect(element).toBeTruthy()
  })
})
