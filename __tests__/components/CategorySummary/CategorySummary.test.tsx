import { Category, MediaItem } from "@api/codegen/graphql"
import CategorySummary, {
  PropsType,
} from "@components/CategorySummary/CategorySummary"
import { act, cleanup, render } from "@testing-library/react"

const defaultProps: PropsType = {
  category: {
    id: "category-id",
    databaseId: 42,
    name: "Products",
    isContentNode: false,
    isTermNode: false,
  },
}

const mockSubCategory = {
  id: "sub-category",
  databaseId: 43,
  name: "Sub Products",
  isContentNode: true,
  isTermNode: true,
}

const mockImage: MediaItem = {
  id: "sub-category-image",
  databaseId: 44,
  altText: "Sub Products",
  sourceUrl: "/image.png",
  isContentNode: true,
  isTermNode: true,
  contentTypeName: "Image",
  mediaItemId: 45,
}

describe("Category Summary", () => {
  describe("Basic renders", () => {
    afterEach(cleanup)

    it("Should render with default props on server", () => {
      const { getByTestId } = render(<CategorySummary {...defaultProps} />)
      const element = getByTestId("category-summary")
      expect(element).toBeTruthy()
    })

    it("Should render with sub-categories", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [mockSubCategory],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories")
      expect(element).toBeTruthy()
    })

    it("Should render with unnamed sub-categories", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [{ ...mockSubCategory, name: undefined }],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories")
      expect(element).toBeTruthy()
    })

    it("Should render with sub-categories with image", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [{ ...mockSubCategory, image: mockImage }],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories")
      expect(element).toBeTruthy()
    })

    it("Should render with unnamed sub-categories with image", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [{ ...mockSubCategory, name: null, image: mockImage }],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories")
      expect(element).toBeTruthy()
    })

    it("Should render with undefined sub-categories", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [undefined as unknown as Category],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories")
      expect(element).toBeTruthy()
    })
  })

  describe("Actions", () => {
    afterEach(cleanup)

    it("Should be able to click scrolling button on medium devices", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [mockSubCategory],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories-clickable-medium")
      act(() => {
        element.click()
      })
      expect(element).toBeTruthy()
    })

    it("Should be able to click scrolling button on small devices", () => {
      const { getByTestId } = render(
        <CategorySummary
          {...{
            category: {
              ...defaultProps.category,
              children: {
                nodes: [mockSubCategory],
              },
            },
          }}
        />
      )
      const element = getByTestId("sub-categories-clickable-small")
      act(() => {
        element.click()
      })
      expect(element).toBeTruthy()
    })
  })
})
