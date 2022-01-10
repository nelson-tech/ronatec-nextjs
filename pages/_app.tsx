import "@assets/main.css"
import "keen-slider/keen-slider.min.css"

import { FC } from "react"
import { AppProps } from "next/app"
import Router from "next/router"
import { ApolloProvider } from "@apollo/client"

import { UIProvider } from "@components/ui/context"
import { initializeApollo, useApollo } from "../lib/apollo"
import ProgressBar from "@lib/progressBar"
import { Layout } from "@components/ui"
import { AuthProvider } from "@lib/hooks"

const Noop: FC = ({ children }) => <>{children}</>

const progress = new ProgressBar({
  size: 2,
  color: "#32de8a",
  className: "progress-bar",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

function RonatecWebsite({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const { client: apolloClient } = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient || initializeApollo({})}>
      <AuthProvider>
        <UIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UIProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default RonatecWebsite
