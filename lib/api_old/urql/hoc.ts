import { NextPage } from "next"
import { withUrqlClient } from "next-urql"

import config from "./config"
import authExchange from "./auth"
import { cacheExchange, dedupExchange, fetchExchange } from "urql"

const withUrql = (Page: NextPage<any, any>) =>
  withUrqlClient(
    ssr => ({
      ...config,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssr,
        authExchange,
        fetchExchange,
      ],
    }),
    {
      ssr: false,
      neverSuspend: true,
    },
  )(Page)

export default withUrql
