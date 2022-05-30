import { act, cleanup, render, screen } from "@testing-library/react"
import CarouselCard, { PropsType } from "@components/CardCarousel/CarouselCard"

const defaultProps: PropsType = {
  name: "Card",
  slug: "card",
  image: {
    id: "card-img-id",
    databaseId: 41,
    altText: "card-img",
    sourceUrl: "/card-img.png",
    isContentNode: false,
    isTermNode: false,
    contentTypeName: "image",
    mediaItemId: 44,
  },
  index: 42,
}

// jest.mock("next/router")

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const renderComponent = (props: PropsType) => {
  return render(<CarouselCard {...props} />)
}

describe("CardCarousel", () => {
  describe("Basic Elements", () => {
    // beforeEach(() => {
    //   renderComponent(defaultProps)
    // })
    afterEach(cleanup)

    it("Should render with default props.", () => {
      renderComponent(defaultProps)
      expect(screen.getByTestId("carousel-card")).toBeInTheDocument()
    })

    it("Should be able to click on card.", () => {
      useRouter.mockImplementationOnce(() => ({
        basePath: "/",
        pathname: "/",
        route: "/",
        query: {},
        asPath: "/",
        push: jest.fn(() => Promise.resolve(true)),
        replace: jest.fn(() => Promise.resolve(true)),
        reload: jest.fn(() => Promise.resolve(true)),
        prefetch: jest.fn(() => Promise.resolve()),
        back: jest.fn(() => Promise.resolve(true)),
        beforePopState: jest.fn(() => Promise.resolve(true)),
        isFallback: false,
        events: {
          on: jest.fn(),
          off: jest.fn(),
          emit: jest.fn(),
        },
      }))
      renderComponent(defaultProps)
      const element = screen.getByTestId("carousel-card")
      act(() => {
        element.click()
      })
      expect(element).toBeInTheDocument()
    })

    it("Should render without image.", () => {
      renderComponent({ ...defaultProps, image: undefined })
      expect(screen.getByTestId("carousel-card")).toBeInTheDocument()
    })

    it("Should render without image sourceUrl.", () => {
      renderComponent({
        ...defaultProps,
        image: {
          ...defaultProps.image!,
          sourceUrl: undefined,
        },
      })
      expect(screen.getByTestId("carousel-card")).toBeInTheDocument()
    })

    it("Should render without image altText.", () => {
      renderComponent({
        ...defaultProps,
        image: {
          ...defaultProps.image!,
          altText: undefined,
        },
      })
      expect(screen.getByTestId("carousel-card")).toBeInTheDocument()
    })
  })
})
