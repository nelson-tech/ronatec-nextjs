import "@assets/main.css"

import { AppProps } from "next/app"
import { ThemeProvider } from "@emotion/react"
import { GlobalStyles } from "twin.macro"
import { FC } from "react"
import { emotionTheme } from "styles/theme"
import { UIProvider } from "@components/ui/context"

const Noop: FC = ({ children }) => <>{children}</>

function RonatecWebsite({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop
  return (
    <UIProvider>
      <ThemeProvider theme={emotionTheme}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UIProvider>
  )
}

export default RonatecWebsite
