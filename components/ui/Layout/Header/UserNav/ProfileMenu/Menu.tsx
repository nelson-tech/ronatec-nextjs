"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import UserIcon from "@heroicons/react/24/outline/UserCircleIcon"

import useStore from "@lib/hooks/useStore"

import AuthMenu from "./AuthMenu"
import GuestMenu from "./GuestMenu"

// ####
// #### Component
// ####

const ProfileMenu = () => {
  const loggedIn = useStore((state) => state.auth.loggedIn)

  return (
    <>
      <Menu
        as="div"
        data-testid="user-menu"
        className="hidden lg:block relative lg:flex-shrink-0 h-full"
      >
        <div>
          <div className="h-full">
            <Menu.Button
              className={`font-bold text-sm rounded py-2 outline-none ${
                loggedIn ? "text-highlight" : "text-gray-400"
              } hover:text-gray-500`}
              data-testid="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <UserIcon className="h-6 w-6" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className=" z-20 absolute -right-[5.25rem] pt-2 w-48">
              <Menu.Items className="rounded bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                {loggedIn ? (
                  <AuthMenu data-testid="auth-menu" />
                ) : (
                  <GuestMenu data-testid="guest-menu" />
                )}
              </Menu.Items>
            </div>
          </Transition>
        </div>
      </Menu>
    </>
  )
}

export default ProfileMenu
