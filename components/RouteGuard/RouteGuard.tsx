import { useState, useEffect, FC, ReactNode, useCallback } from "react"
import { useRouter } from "next/router"

import { useAuth } from "@lib/hooks"

const RouteGuard: FC<ReactNode> = ({ children }: any) => {
  const router = useRouter()
  const { loggedIn } = useAuth()
  const [authorized, setAuthorized] = useState(false)

  const authCheck = useCallback(() => {
    const url = router.asPath
    // redirect to login page if accessing a private page and not logged in
    const restrictedPaths = ["/dashboard", "/dashboard/orders"]
    const path = url.split("?")[0]
    const basePath = path.split("/")[1]
    console.log("BASE", basePath)

    const restrictedBasePaths = ["dashboard"]
    if (
      !loggedIn &&
      (restrictedPaths.includes(path) || restrictedBasePaths.includes(basePath))
    ) {
      setAuthorized(false)
      router.push({
        pathname: "/login",
        query: { redirect: url },
      })
    } else {
      setAuthorized(true)
    }
  }, [loggedIn, router])

  useEffect(() => {
    // on initial load - run auth check
    authCheck()

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on("routeChangeStart", hideContent)

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent)
      router.events.off("routeChangeComplete", authCheck)
    }
  }, [authCheck, router.events])

  if (authorized) {
    return children
  }

  return <div></div>
}

export default RouteGuard
