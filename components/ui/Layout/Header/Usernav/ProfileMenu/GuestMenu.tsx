import { memo } from "react"
import { Menu } from "@headlessui/react"
import ClipboardCheckIcon from "@heroicons/react/outline/ClipboardCheckIcon"
import LoginIcon from "@heroicons/react/outline/LoginIcon"

import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"

const GuestMenu = memo(function GuestMenu() {
  const setLoginOpen = useStore(state => state.auth.setLoginModalOpen)

  return (
    <>
      <Menu.Item>
        <div
          onClick={() => setLoginOpen(true)}
          className="transition cursor-pointer flex items-center outline-none ring-transparent text-green-main px-4 py-2 text-sm hover:bg-green-main hover:text-white"
        >
          <LoginIcon className="h-4 w-4 mr-1.5" />
          <div className="target">Sign in</div>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="group">
          <Link
            href="/register"
            className="transition flex items-center text-blue-dark outline-none ring-transparent px-3.5 py-2 text-sm hover:bg-blue-main hover:text-white"
          >
            <ClipboardCheckIcon className="h-4 w-4 mr-2" />
            <div className="target">Register</div>
          </Link>
        </div>
      </Menu.Item>
    </>
  )
})

export default GuestMenu
