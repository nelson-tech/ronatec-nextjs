"use client"

import useStore from "@lib/hooks/useStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type AuthCheckerInputType = {
  forceGuest?: boolean
  redirect: string
}

const AuthChecker = ({
  forceGuest = false,
  redirect,
}: AuthCheckerInputType) => {
  const { isAuth, ready } = useStore((state) => ({
    isAuth: state.auth.loggedIn,
    ready: state.auth.ready,
  }))
  const router = useRouter()

  useEffect(() => {
    if (ready && isAuth == forceGuest) {
      router.push(redirect)
    }
  }, [isAuth, ready, router, redirect, forceGuest])

  return <></>
}

export default AuthChecker
