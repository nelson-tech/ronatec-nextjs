"use client"

import { Fragment } from "react"
import { createGraphiQLFetcher } from "@graphiql/toolkit"
import { GraphiQL } from "graphiql"

import "graphiql/graphiql.css"

import { API_URL } from "@lib/constants"
import isServer from "@lib/utils/isServer"

const IDE = () => {
  if (!isServer) {
    const url = API_URL ?? ""
    const fetcher = createGraphiQLFetcher({
      url,
      fetch,
    })

    return (
      <Fragment>
        <GraphiQL fetcher={fetcher} />
      </Fragment>
    )
  }
  return <Fragment />
}

export default IDE
