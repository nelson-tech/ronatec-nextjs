"use client"

import { memo } from "react"
import { Menu } from "@headlessui/react"
import LogoutIcon from "@heroicons/react/24/outline/ArrowRightCircleIcon"

import useLogout from "@lib/hooks/auth/useLogout"
import customerMenu from "@lib/customerMenu"

import Link from "@components/Link"

// ####
// #### Component
// ####

const AuthMenu = memo(function AuthMenu() {
  const { logout } = useLogout()

  const handleLogout = async () => {
    await logout()
  }
  const capitalize = (input: string) => {
    return input
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ")
  }

  return (
    <>
      {customerMenu.map((item) => {
        return (
          <Menu.Item
            key={"usernav" + item.name}
            data-testid="auth-menu"
            as={Link}
            href={item.href}
            className="transition flex items-center hover:bg-blue-main outline-none ring-transparent hover:text-white text-blue-dark px-4 py-2 text-sm"
          >
            {item.icon({ className: "h-4 w-4 mr-2" })}
            {capitalize(item.name)}
          </Menu.Item>
        )
      })}

      <Menu.Item>
        <div
          className="transition flex cursor-pointer items-center outline-none ring-transparent text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white"
          onClick={handleLogout}
        >
          <LogoutIcon className="h-4 w-4 mr-1.5" />
          <div className="target">Sign out</div>
        </div>
      </Menu.Item>
    </>
  )
})

export default AuthMenu
