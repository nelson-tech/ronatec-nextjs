import { render } from "@testing-library/react"
import { Client, Provider } from "urql"
import { never } from "wonka"

it("renders", () => {
  const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
  }

  const wrapper = render(
    <Provider value={mockClient as unknown as Client}>
      <>Testing Client</>
    </Provider>
  )
  expect(mockClient.executeQuery).toBeCalledTimes(0)
})
