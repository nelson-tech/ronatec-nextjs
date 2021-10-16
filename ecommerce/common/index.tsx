import { createContext, FC, ReactNode, useContext, useMemo } from "react"
import { APIConfig, APIProviderContext } from "./types/api"
import { APIHooks } from "./types/hooks"

interface APIProviderProps {
  children: ReactNode | ReactNode[]
  config: APIConfig
  hooks: APIHooks
}

export const APIContext = createContext<Partial<APIProviderContext>>({})

export const CoreAPIProvider = ({
  children,
  config,
  hooks,
}: APIProviderProps) => {
  const coreConfig = useMemo(() => {
    return {
      fetcher: config.fetch,
      hooks,
      checkoutId: config.checkoutCookie,
    }
  }, [config.fetch, hooks])
  return (
    <APIContext.Provider value={coreConfig}>{children}</APIContext.Provider>
  )
}

export const useCoreAPIProvider = () => {
  return useContext(APIContext) as APIProviderContext
}
