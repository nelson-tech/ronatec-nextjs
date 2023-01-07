"use client"

import { useCreateStore, Provider } from "@lib/store"

type RootClientContextProps = {
  children: React.ReactNode
}

const RootClientContext = ({ children }: RootClientContextProps) => {
  const createStore = useCreateStore()
  // useNavigationEvent()

  // const { needsRefresh, isAuth, cart, user, tokens } = authData
  // if (needsRefresh) {
  // 	// Make refresh call on client to set cookies
  // 	// Remove this once next.js supports setting cookies from within the layout call
  // 	const body: API_SetInputType = { action: "SET", newCookies: needsRefresh }

  // 	fetch(AUTH_ENDPOINT, { method: "POST", body: JSON.stringify(body) })
  // }

  return (
    <Provider createStore={createStore}>
      {/* <RootStyleRegistry colors={colors}> */}
      {children}
      {/* </RootStyleRegistry> */}
    </Provider>
  )
}

export default RootClientContext
