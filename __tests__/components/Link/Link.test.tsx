import { render, screen } from "@testing-library/react"
import Link, { PropsType } from "@components/Link/Link"

const props: PropsType = {
  id: "dGVybTo0Ng==",
  href: "",
  children: "Test Link",
}

const renderCard = (props: PropsType) => {
  render(<Link {...props} />)
}

describe("Link", () => {
  describe("Basic Elements", () => {
    beforeEach(() => {
      renderCard(props)
    })

    it("Should show Next link.", () => {
      expect(screen.getByText(props.children as string)).toBeInTheDocument()
    })
  })
})
