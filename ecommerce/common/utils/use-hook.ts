import { useCoreAPIProvider } from "@common"
import { APIFetcher } from "@common/types/api"
import { APIHooks, Hook } from "@common/types/hooks"
import { MutationHook } from "@common/types/hooks"
import useSWR from "swr"

export const useHook = <H>(fn: (apiHooks: APIHooks) => H) => {
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

const useData = (hook: any, fetcher: APIFetcher, context: any) => {
  const hookFetcher = async (query: string) => {
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: { query },
        input: {},
      })
    } catch (error) {
      throw error
    }
  }

  const response = useSWR(
    hook.fetcherOptions.query,
    hookFetcher,
    context.swrOptions,
  )

  return response
}

export const useSWRHook = (hook: any) => {
  const { fetcher } = useCoreAPIProvider()

  return hook.useHook({
    useData(context: any) {
      const data = useData(hook, fetcher, context)
      return data
    },
  })
}
