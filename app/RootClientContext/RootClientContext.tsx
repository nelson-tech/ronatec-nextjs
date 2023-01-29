"use client"

import type { LayoutAuthDataType } from "@lib/types/auth"
import APIContext from "./APIContext"
import ClientInitContext from "./ClientInitContext"
import StoreContext from "./StoreContext"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
  authData: LayoutAuthDataType
}

const RootClientContext = ({ children, authData }: RootClientContextProps) => {
  // useNavigationEvent()

  return (
    <APIContext tokens={authData.tokens}>
      <StoreContext authData={authData}>
        <ClientInitContext authData={authData}>
          {/* <RootStyleRegistry colors={colors}> */}
          {children}
          {/* </RootStyleRegistry> */}
        </ClientInitContext>
      </StoreContext>
    </APIContext>
  )
}

export default RootClientContext
