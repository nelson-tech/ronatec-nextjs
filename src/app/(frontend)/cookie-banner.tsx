"use client"

import { useEffect, useState } from "react"

const COOKIE_NAME = "ronatec_cookie_consent"
const VISIT_ID_COOKIE = "rt_visit_id"

function getCookie(name: string): string | null {
  for (const part of document.cookie.split(";")) {
    const trimmed = part.trim()
    if (!trimmed.startsWith(name + "=")) continue
    return decodeURIComponent(trimmed.slice(name.length + 1))
  }
  return null
}

function hasConsentCookie(): boolean {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith(COOKIE_NAME + "="))
}

function setConsent(value: string) {
  const d = new Date()
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000)
  document.cookie = `${COOKIE_NAME}=${value}; expires=${d.toUTCString()}; path=/; domain=.ronatec.us; SameSite=Lax`
}

export function CookieBanner() {
  const [show, setShow] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (hasConsentCookie()) return
    setShow(true)
    requestAnimationFrame(() => {
      setTimeout(() => setEntered(true), 80)
    })
  }, [])

  useEffect(() => {
    const consentAccepted = document.cookie.includes(
      "ronatec_cookie_consent=accepted"
    )
    if (!consentAccepted) return

    const visitId = getCookie(VISIT_ID_COOKIE)
    if (!visitId) return
    const rid = visitId

    function onClick(e: MouseEvent) {
      const target = e.target
      if (!(target instanceof Element)) return
      const link = target.closest("a")
      if (!link) return

      const href = link.getAttribute("href")
      if (!href) return

      try {
        const url = new URL(href, window.location.origin)
        if (
          url.hostname === "equipment.ronatec.us" &&
          !url.searchParams.get("rid")
        ) {
          url.searchParams.set("rid", rid)
          link.setAttribute("href", url.toString())
        }
      } catch {
        /* ignore invalid href */
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  function onAccept() {
    setConsent("accepted")
    window.location.reload()
  }

  function onDecline() {
    setConsent("declined")
    setEntered(false)
    setTimeout(() => setShow(false), 350)
  }

  if (!show) return null

  return (
    <div
      id="cookie-banner"
      style={{
        position: "fixed",
        bottom: 24,
        left: 12,
        right: 12,
        maxWidth: 980,
        margin: "0 auto",
        background: "#0b1f3a",
        color: "#fff",
        padding: "18px 20px",
        fontSize: 14,
        lineHeight: 1.5,
        zIndex: 9999,
        display: "block",
        borderRadius: 12,
        boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div style={{ flex: "1 1 520px", minWidth: 260 }}>
          We use cookies and limited business identification tools to understand
          which organizations are engaging with our site and to improve site
          performance.{" "}
          <a
            href="/privacy-policy/"
            style={{ color: "#f5c542", textDecoration: "underline" }}
          >
            Learn more
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flex: "0 0 auto",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            id="accept-cookies"
            onClick={onAccept}
            style={{
              background: "#f5c542",
              color: "#0b1f3a",
              border: "none",
              padding: "9px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Accept Cookies
          </button>

          <button
            type="button"
            id="decline-cookies"
            onClick={onDecline}
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.7)",
              padding: "9px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
