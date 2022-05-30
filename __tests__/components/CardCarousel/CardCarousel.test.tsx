import { cleanup, render, screen } from "@testing-library/react"
import CardCarousel, { PropsType } from "@components/CardCarousel/CardCarousel"

const defaultProps: PropsType = {
  header: "Hello",
  link: {
    label: "Link",
    path: "/link",
  },
  items: [
    {
      id: "item",
      databaseId: 42,
      name: "Cleaner",
      ancestors: null,
      isContentNode: true,
      isTermNode: true,
    },
  ],
  products: [
    {
      id: "product",
      databaseId: 43,
      name: "Cleaner",
      slug: "cleaner",
      productCategories: {
        nodes: [
          {
            id: "category",
            databaseId: 44,
            slug: "products",
            name: "Category",
            isContentNode: true,
            isTermNode: true,
          },
        ],
      },
    },
  ],
}

const renderComponent = (props: PropsType) => {
  render(<CardCarousel {...props} />)
}

describe("CardCarousel", () => {
  describe("Basic Elements", () => {
    // beforeEach(() => {
    //   renderComponent(defaultProps)
    // })
    afterEach(cleanup)

    it("Should render with default props.", () => {
      renderComponent(defaultProps)
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render with categories and without products.", () => {
      renderComponent({ ...defaultProps, products: undefined })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render with unnamed categories and without products.", () => {
      renderComponent({
        ...defaultProps,
        products: undefined,
        items: [{ ...defaultProps.items![0], name: undefined }],
      })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render with products and without categories.", () => {
      renderComponent({ ...defaultProps, items: undefined })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render with unnamed products and without categories.", () => {
      renderComponent({
        ...defaultProps,
        items: undefined,
        products: [{ ...defaultProps.products![0], name: undefined }],
      })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render with uncategorized products and without categories.", () => {
      renderComponent({
        ...defaultProps,
        items: undefined,
        products: [
          { ...defaultProps.products![0], productCategories: undefined },
        ],
      })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
      cleanup()
      renderComponent({
        ...defaultProps,
        items: undefined,
        products: [
          { ...defaultProps.products![0], productCategories: { nodes: [] } },
        ],
      })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })

    it("Should render without products or categories.", () => {
      renderComponent({
        ...defaultProps,
        items: undefined,
        products: undefined,
      })
      expect(screen.getByTestId("card-carousel")).toBeInTheDocument()
    })
  })
})
