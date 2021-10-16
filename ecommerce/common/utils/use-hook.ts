import { useCoreAPIProvider } from "@common"
import { APIFetcher } from "@common/types/api"
import { APIHooks } from "@common/types/hooks"
import { MutationHook } from "@common/types/hooks"
import { useState } from "react"

export const useHook = (fn: (apiHooks: APIHooks) => MutationHook) => {
  const { hooks } = useCoreAPIProvider()
  return fn(hooks)
}

export const useMutationHook = (hook: MutationHook) => {
  const { fetcher } = useCoreAPIProvider()

  return hook.useHook({
    fetch: (input: any) => {
      return hook.fetcher({
        input,
        fetch: fetcher,
        options: hook.fetcherOptions,
      })
    },
  })
}

const useData = (hook: any, fetcher: APIFetcher) => {
  const [data, setData] = useState(null)

  const hookFetcher = async () => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: hook.fetchOptions,
        input: {},
      })
    } catch (error) {
      throw error
    }
  }

  if (!data) {
    hookFetcher().then(data => {
      setData(data)
    })
  }

  return data
}

export const useSWRHook = (hook: any) => {
  const { fetcher } = useCoreAPIProvider()
  return hook.useHook({
    useData() {
      const data = useData(hook, fetcher)
      return data
    },
  })
}
