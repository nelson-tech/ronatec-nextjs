import { CoreAPIProvider, useCoreAPIProvider } from "@common"
import { FC, ReactNode } from "react"
import { getCommerceConfig } from "./api/config"
import { shopifyHooks } from "./hooks"

interface ShopifyAPIProviderProps {
  children: ReactNode | ReactNode[]
}

const config = getCommerceConfig()

export const APIProvider: FC<ShopifyAPIProviderProps> = ({ children }) => {
  return (
    <CoreAPIProvider config={config} hooks={shopifyHooks}>
      {children}
    </CoreAPIProvider>
  )
}

export const useAPIProvider = () => useCoreAPIProvider()
