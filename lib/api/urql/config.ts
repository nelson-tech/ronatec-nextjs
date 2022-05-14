import { ClientOptions } from "urql"
import fetch from "./fetch"

const clientOptions: ClientOptions = {
  url: process.env.NEXT_PUBLIC_API_BASE_URL || "/graphql",
  fetch,
  fetchOptions: {
    mode: "cors",
    credentials: "include",
  },
}

export default clientOptions
