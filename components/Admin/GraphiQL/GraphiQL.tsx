"use client"

import { createGraphiQLFetcher } from "@graphiql/toolkit"
import { GraphiQL } from "graphiql"
import React from "react"
import ReactDOM from "react-dom"

import "graphiql/graphiql.css"

const fetcher = createGraphiQLFetcher({
  url: "https://spin.ronatec.us/graphql",
})

const GraphiQLEditor = () => {
  ReactDOM.render(<GraphiQL fetcher={fetcher} />, document.body)
  return <div className=" min-h-screen"></div>
}

export default GraphiQLEditor
