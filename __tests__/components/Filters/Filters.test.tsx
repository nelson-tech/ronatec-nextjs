import Filters, { PropsType } from "@components/Filters/Filters"
import { act, cleanup, render } from "@testing-library/react"

const defaultProps: Partial<PropsType> = {
  categories: [
    {
      id: "category-id",
      databaseId: 42,
      name: "Products",
      slug: "products",
      children: {
        nodes: [
          {
            id: "sub-category",
            databaseId: 43,
            name: "Sub Category",
            isContentNode: false,
            isTermNode: false,
            children: {
              nodes: [
                {
                  id: "sub-sub-category",
                  databaseId: 44,
                  name: "Sub Sub Category",
                  isContentNode: false,
                  isTermNode: false,
                },
              ],
            },
          },
        ],
      },
      isContentNode: false,
      isTermNode: false,
    },
  ],
  selectedCategories: ["Products"],
  setSelectedCategories: jest.fn(() => {}),
}

describe("Filters", () => {
  describe("Basic renders", () => {
    afterEach(cleanup)

    it("Should render with default props", () => {
      const { getByTestId } = render(
        <Filters {...(defaultProps as PropsType)}>
          <>TEST CHILDREN</>
        </Filters>,
      )
      const element = getByTestId("filters")
      expect(element).toBeTruthy()
    })

    it("Should render without selectedCategories", () => {
      const { getByTestId } = render(
        <Filters
          {...{
            ...(defaultProps as PropsType),
            selectedCategories: null,
          }}
        >
          <>TEST CHILDREN</>
        </Filters>,
      )
      const element = getByTestId("filters")
      expect(element).toBeTruthy()
    })

    it("Should render with empty selectedCategories", () => {
      const { getByTestId } = render(
        <Filters
          {...{
            ...(defaultProps as PropsType),
            selectedCategories: [],
          }}
        >
          <>TEST CHILDREN</>
        </Filters>,
      )
      const element = getByTestId("filters")
      expect(element).toBeTruthy()
    })
  })

  describe("Actions", () => {
    afterEach(cleanup)

    it("Should display categories after clicking on button", async () => {
      const { getByTestId } = render(
        <Filters {...(defaultProps as PropsType)}>
          <>TEST CHILDREN</>
        </Filters>,
      )
      const button = getByTestId("filters-button")
      await act(async () => {
        await button.click()
      })
      const categoryName = `${defaultProps.categories![0]!.name}-input`

      const element = getByTestId(categoryName)
      expect(element).toBeTruthy()
    })

    it("Should call setSelectedCategories after clicking category", async () => {
      const { getByTestId } = render(
        <Filters {...(defaultProps as PropsType)}>
          <>TEST CHILDREN</>
        </Filters>,
      )
      const button = getByTestId("filters-button")

      await act(async () => {
        await button.click()
      })

      const categoryName = `${defaultProps.categories![0]!.name}-input`
      const element = getByTestId(categoryName)

      await act(async () => {
        await element.click()
      })

      expect(defaultProps.setSelectedCategories).toBeCalledTimes(1)
    })

    it("Should display error after clicking on button without slug", async () => {
      const { getByTestId } = render(
        <Filters
          {...{
            ...(defaultProps as PropsType),
            categories: [{ ...defaultProps.categories![0], slug: undefined }],
          }}
        >
          <>TEST CHILDREN</>
        </Filters>,
      )
      const button = getByTestId("filters-button")
      await act(async () => {
        await button.click()
      })

      const element = getByTestId("categories-error")
      expect(element).toBeTruthy()
    })
  })
})
