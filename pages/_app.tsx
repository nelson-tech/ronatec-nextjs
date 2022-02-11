import "@assets/main.css"
// import "keen-slider/keen-slider.min.css"

import { FC } from "react"
import { AppProps } from "next/app"
import dynamic from "next/dist/shared/lib/dynamic"
import Router from "next/router"

import { ProgressBar } from "@lib"
import initializeApollo from "@lib/apollo/client"
import useApollo from "@lib/apollo/useApollo"
import Layout from "@components/ui/Layout"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const ApolloProvider = dynamic(() => import("@lib/apollo/provider"), importOpts)

// ####
// #### Variables
// ####

// const Noop: FC = ({ children }) => <>{children}</>

const progress = new ProgressBar({
  size: 2,
  color: "#32de8a",
  className: "progress-bar",
  delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

// ####
// #### Component
// ####

function RonatecWebsite({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  const { client: apolloClient } = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient || initializeApollo({})}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default RonatecWebsite
