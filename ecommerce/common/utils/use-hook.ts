import { useCoreAPIProvider } from "@common"
import { APIHooks } from "@common/types/api"
import { MutationHook } from "@common/types/hooks"

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
