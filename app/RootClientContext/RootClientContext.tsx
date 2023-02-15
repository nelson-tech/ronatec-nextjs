"use client"

import APIContext from "./APIContext"
import StoreContext from "./StoreContext"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
}

const RootClientContext = ({ children }: RootClientContextProps) => {
  // useNavigationEvent()

  return (
    <APIContext>
      <StoreContext>
        {/* <ClientInitContext authData={authData}> */}
        {/* <RootStyleRegistry colors={colors}> */}
        {children}
        {/* </RootStyleRegistry> */}
        {/* </ClientInitContext> */}
      </StoreContext>
    </APIContext>
  )
}

export default RootClientContext
