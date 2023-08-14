import router, { Router } from "next/router"

import { cleanup, render, screen } from "@testing-library/react"
import CustomApp, { progress } from "@pages/_app"
import * as utils from "@api/urql/utils"

const mockStart = jest.spyOn(progress, "start")
const mockDone = jest.spyOn(progress, "finish")

const mockedGetAuthToken = jest.spyOn(utils, "getAuthToken")

// const mockedGetAuthToken = getAuthToken as unknown as jest.MockedFn<
//   typeof getAuthToken
// >

jest.mock("@store", () => ({
  useCreateStore: jest.fn(),
  Provider: jest.fn(),
}))

const TestChild = () => {
  return <>TEST</>
}

const CustomizedApp = ({ props }: { props?: any }) => (
  <CustomApp
    pageProps={props}
    Component={TestChild}
    router={null as unknown as Router}
  />
)

describe("Custom Next.js App", () => {
  afterEach(cleanup)

  it("Should render unprotected page", () => {
    render(<CustomizedApp props={{ protected: false }} />)
  })

  it("Should render unprotected page with authToken", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: null,
      authExpiration: 42,
    }))
    const { container, getByTestId } = render(
      <CustomizedApp props={{ protected: true }} />
    )

    const element = getByTestId("custom-app")
    expect(element).toBeTruthy()
  })

  it("Should render protected page with authToken", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: "Authorized",
      authExpiration: 42,
    }))
    const { container, getByTestId } = render(
      <CustomizedApp props={{ protected: true }} />
    )

    const element = getByTestId("custom-app")
    expect(element).toBeTruthy()
    // Router.events.emit("routeChangeStart")
    // expect(mockStart).toHaveBeenCalled()
  })

  it("Should render error page without authToken", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: null,
      authExpiration: 42,
    }))
    const { container, getByTestId } = render(
      <CustomizedApp props={{ protected: true }} />
    )

    const element = getByTestId("custom-app")
    expect(element).toBeTruthy()
  })

  it("Should start progress bar on router change start", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: null,
      authExpiration: 42,
    }))
    render(<CustomizedApp props={{ protected: true }} />)

    Router.events.emit("routeChangeStart")
    expect(mockStart).toHaveBeenCalled()
  })

  it("Should stop progress bar on router change complete", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: null,
      authExpiration: 42,
    }))
    render(<CustomizedApp props={{ protected: true }} />)

    Router.events.emit("routeChangeComplete")
    expect(mockDone).toHaveBeenCalled()
  })

  it("Should stop progress bar on router change error", () => {
    mockedGetAuthToken.mockImplementationOnce(() => ({
      authToken: null,
      authExpiration: 42,
    }))
    render(<CustomizedApp props={{ protected: true }} />)

    Router.events.emit("routeChangeError")
    expect(mockDone).toHaveBeenCalled()
  })
})
