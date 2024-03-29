"use client"

import { memo } from "react"
import { Menu } from "@headlessui/react"
import ClipboardCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon"
import LoginIcon from "@heroicons/react/24/outline/ArrowLeftCircleIcon"

import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"

// ####
// #### Component
// ####

const GuestMenu = memo(function GuestMenu() {
  const setLoginOpen = useStore((state) => state.auth.setLoginModalOpen)

  return (
    <>
      <Menu.Item>
        <div
          onClick={() => setLoginOpen(true)}
          className="transition cursor-pointer flex items-center outline-none ring-transparent text-highlight px-4 py-2 text-sm hover:bg-highlight hover:text-white"
        >
          <LoginIcon className="h-4 w-4 mr-1.5" />
          <div className="target">Log in</div>
        </div>
      </Menu.Item>
      <Menu.Item
        as={Link}
        href="/register"
        className="transition group flex items-center text-accent-dark outline-none ring-transparent px-3.5 py-2 text-sm hover:bg-accent hover:text-white"
      >
        <ClipboardCheckIcon className="h-4 w-4 mr-2" />
        <div className="target">Register</div>
      </Menu.Item>
    </>
  )
})

export default GuestMenu
