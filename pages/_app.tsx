// import '@assets/main.css'

import { AppProps } from "next/app"
import { GlobalStyles } from "twin.macro"
import { FC } from "react"

const Noop: FC = ({ children }) => <>{children}</>

function RonatecWebsite({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  )
}

export default RonatecWebsite
