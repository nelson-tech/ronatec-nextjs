import { ProductCategory } from "@api/gql/types"
import { render, screen } from "@testing-library/react"
import Breadcrumbs, { PropsType } from "@components/Breadcrumbs/Breadcrumbs"

const mockCategory: ProductCategory = {
  id: "dGVybTo0Ng==",
  databaseId: 46,
  name: "Chemicals",
  isContentNode: true,
  isTermNode: true,
  ancestors: {
    nodes: [
      {
        id: "sertrn",
        databaseId: 47,
        name: "Products",
        isContentNode: true,
        isTermNode: true,
      },
    ],
  },
}

const renderComponent = (props: PropsType) => {
  render(<Breadcrumbs {...props} />)
}

describe("Breadcrumbs", () => {
  describe("Basic Elements", () => {
    beforeEach(() => {
      renderComponent({ category: mockCategory })
    })

    it("Should show shop link.", () => {
      expect(screen.getByTestId("shop-link")).toBeInTheDocument()
    })

    it("Should show ancestor category.", () => {
      expect(
        screen.getByTestId(mockCategory!.ancestors!.nodes![0]!.name!),
      ).toBeInTheDocument()
    })

    it("Should show category.", () => {
      expect(screen.getByTestId(mockCategory!.name!)).toBeInTheDocument()
    })
  })

  describe("Various inputs", () => {
    it("Should render without ancestors.", () => {
      renderComponent({
        category: { ...mockCategory, ancestors: { nodes: [null] } },
        info: true,
      })
      expect(screen.getByTestId(mockCategory!.name!)).toBeInTheDocument()
    })

    it("Should show category with info.", () => {
      renderComponent({ category: mockCategory, info: true })
      expect(screen.getByTestId(mockCategory!.name!)).toBeInTheDocument()
    })

    it("Should show category with products.", () => {
      renderComponent({ category: mockCategory, product: true })
      expect(screen.getByTestId(mockCategory!.name!)).toBeInTheDocument()
    })
  })
})
