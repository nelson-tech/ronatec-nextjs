"use client"

import { Cart, User } from "payload/generated-types"
import StoreContext from "./StoreContext"

//
// Types
//

type RootClientContextProps = {
  children: React.ReactNode
  user: User | null
  cart: Cart | null
}

//
// Component
//

const RootClientContext = ({
  children,
  user,
  cart,
}: RootClientContextProps) => {
  return (
    <StoreContext user={user} cart={cart}>
      {/* <AuthContext invalidToken={invalidToken}> */}
      {children}
      {/* </AuthContext> */}
    </StoreContext>
  )
}

export default RootClientContext
