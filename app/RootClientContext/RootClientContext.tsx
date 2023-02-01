"use client"

import { AUTH_TOKEN_KEY } from "@lib/constants"
import type { Layout_AuthData_Type } from "@lib/types/auth"
import setCookie from "@lib/utils/setCookie"

import APIContext from "./APIContext"
// import ClientInitContext from "./ClientInitContext"
import StoreContext from "./StoreContext"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
  authData: Layout_AuthData_Type
}

const RootClientContext = ({ children, authData }: RootClientContextProps) => {
  // useNavigationEvent()

  const { newAuth, tokens } = authData

  newAuth && setCookie(AUTH_TOKEN_KEY, tokens.auth)

  return (
    <APIContext tokens={tokens}>
      <StoreContext authData={authData}>
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
