import { useRef } from "react"

import { createClientStore, initialStateType, StoreContext, StoreType } from "."

type StoreProviderPropsType = React.PropsWithChildren<initialStateType>

const StoreProvider = ({ children, ...props }: StoreProviderPropsType) => {
  const storeRef = useRef<StoreType>()
  if (!storeRef.current) {
    storeRef.current = createClientStore(props)
  }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
