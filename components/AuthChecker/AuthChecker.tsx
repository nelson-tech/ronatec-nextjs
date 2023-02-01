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
  const isAuth = useStore(state => state.auth.loggedIn)
  const router = useRouter()

  useEffect(() => {
    if (isAuth == forceGuest) {
      router.push(redirect)
    }
  }, [isAuth, router, redirect, forceGuest])

  return <></>
}

export default AuthChecker
