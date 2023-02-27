"use client"

import APIContext from "./APIContext"
import ClientContext from "./ClientContext"
import StoreContext from "./StoreContext"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
}

//
// Component
//

const RootClientContext = ({ children }: RootClientContextProps) => {
  return (
    <APIContext>
      <StoreContext>
        <ClientContext>{children}</ClientContext>
      </StoreContext>
    </APIContext>
  )
}

export default RootClientContext
