"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import useStore from "@hooks/useStore"

type AuthCheckerInputType = {
  forceGuest?: boolean
  redirect: string
}

const AuthChecker = ({
  forceGuest = false,
  redirect,
}: AuthCheckerInputType) => {
  const isAuth = useStore((state) => !!state.auth.user?.id)
  const router = useRouter()

  useEffect(() => {
    if (isAuth === forceGuest) {
      router.push(redirect)
    }
  }, [isAuth, router, redirect, forceGuest])

  return <></>
}

export default AuthChecker
