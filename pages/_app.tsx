import "@assets/main.css"

import { AppProps } from "next/app"
import { ThemeProvider } from "@emotion/react"
import { GlobalStyles } from "twin.macro"
import { FC } from "react"
import { emotionTheme } from "styles/theme"

const Noop: FC = ({ children }) => <>{children}</>

function RonatecWebsite({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop
  return (
    <ThemeProvider theme={emotionTheme}>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default RonatecWebsite
