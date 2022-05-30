import { cleanup, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import UserMenu from "@components/ui/Layout/Header/UserNav/ProfileMenu/Menu"

import useStore from "@lib/hooks/useStore"
jest.mock("@lib/hooks/useStore")
const setStore = (input: any) => {
  const mockedStore = useStore as unknown as jest.MockedFn<typeof useStore>
  mockedStore.mockImplementation(() => input)
}

describe("User Menu", () => {
  describe("Basic Elements", () => {
    // beforeEach(() => {
    //   render(<UserMenu />)
    // })

    afterEach(cleanup)

    it("Should render when logged out.", () => {
      setStore(false)
      render(<UserMenu />)
      const element = screen.getByTestId("user-menu")
      expect(element).toBeTruthy()
    })

    it("Should render when logged in.", () => {
      setStore(true)
      render(<UserMenu />)
      const element = screen.getByTestId("user-menu")
      expect(element).toBeTruthy()
    })
  })
})
