import { MediaItem } from "@api/codegen/graphql"
import { act, cleanup, render } from "@testing-library/react"
import SupplierCard, {
  PropsType,
} from "@components/Cards/Supplier/SupplierCard"

const defaultProps: PropsType = {
  supplier: {
    id: "supplier",
    databaseId: 42,
    supplier: { text: "This is information about the supplier" },
    title: "Supplier Title",
    isContentNode: true,
    isTermNode: true,
    contentTypeName: "supplier",
    supplierId: 43,
  },
  setIsOpen: jest.fn((open: boolean) => {}),
  setChosenSupplier: jest.fn((chosen: any) => {}),
}

const mockImage: MediaItem = {
  id: "image-id",
  databaseId: 40,
  sourceUrl: "/image.png",
  isContentNode: false,
  isTermNode: false,
  contentTypeName: "image",
  mediaItemId: 41,
}

// Mock Icon component
jest.mock("@components/ui/Icon", () => () => {
  return <div></div>
})

// Mock Icon component
jest.mock("@components/Image", () => () => {
  return <div></div>
})

describe("Icon Card", () => {
  describe("Intended renders", () => {
    afterEach(cleanup)

    it("Should render with default props", () => {
      const { getByTestId } = render(<SupplierCard {...defaultProps} />)
      const element = getByTestId("supplier-card")
      expect(element).toBeTruthy()
    })

    it("Should render when featured is passed", () => {
      const { getByTestId } = render(
        <SupplierCard
          {...{
            ...defaultProps,
            featured: true,
            headerText: "Supplier Header",
            supplier: {
              ...defaultProps.supplier,
              supplier: {
                ...defaultProps.supplier.supplier,
                image: mockImage,
              },
            },
          }}
        />
      )

      const element = getByTestId("supplier-card-featured")
      expect(element).toBeTruthy()
    })

    it("Should render with isOpen and chosenSupplier passed", () => {
      const { getByTestId } = render(
        <SupplierCard
          {...{
            ...defaultProps,
            isOpen: true,
            chosenSupplier: { title: "Supplier Title" },
          }}
        />
      )
      const element = getByTestId("supplier-card")
      expect(element).toBeTruthy()
    })
  })

  describe("Actions", () => {
    afterEach(cleanup)

    it("Should call passed functions after clicking", () => {
      const { getByTestId } = render(<SupplierCard {...defaultProps} />)
      const element = getByTestId("supplier-card-clickable")
      act(() => {
        element.click()
      })
      expect(defaultProps.setIsOpen).toBeCalledTimes(1)
      expect(defaultProps.setChosenSupplier).toBeCalledTimes(1)
      expect(element).toBeTruthy()
    })
  })

  describe("Errors", () => {
    afterEach(cleanup)

    it("Should render an error without setChosenSupplier and setIsOpen", () => {
      const { getByTestId } = render(
        <SupplierCard
          {...{
            ...defaultProps,
            supplier: { ...defaultProps.supplier },
            setChosenSupplier: undefined,
            setIsOpen: undefined,
          }}
        />
      )
      const element = getByTestId("supplier-card-error")
      expect(element).toBeTruthy()
    })

    it("Should render an error without supplier.supplier", () => {
      const { getByTestId } = render(
        <SupplierCard
          {...{
            ...defaultProps,
            supplier: { ...defaultProps.supplier, supplier: undefined },
          }}
        />
      )
      const element = getByTestId("supplier-card-error")
      expect(element).toBeTruthy()
    })
  })
})
