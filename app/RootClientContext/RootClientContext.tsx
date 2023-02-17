"use client"

import APIContext from "./APIContext"
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
      <StoreContext>{children}</StoreContext>
    </APIContext>
  )
}

export default RootClientContext
