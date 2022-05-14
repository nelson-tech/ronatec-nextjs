import { Fragment } from "react"
import dynamic from "next/dynamic"
import { Menu, Transition } from "@headlessui/react"
import UserIcon from "@heroicons/react/outline/UserIcon"

import useStore from "@lib/hooks/useStore"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const AuthMenu = dynamic(() => import("./AuthMenu"), clientOpts)
const GuestMenu = dynamic(() => import("./GuestMenu"), {})

// ####
// #### Component
// ####

const ProfileMenu = () => {
  const loggedIn = useStore(state => state.auth.loggedIn)

  return (
    <>
      <Menu
        as="div"
        className="hidden lg:block relative lg:flex-shrink-0 h-full"
      >
        {({ open }) => (
          <div>
            <div className="h-full">
              <Menu.Button
                className={`font-bold text-sm rounded-md py-2 outline-none ${
                  loggedIn ? " text-green-main " : "text-gray-400"
                } hover:text-gray-500`}
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
              <div className="origin-top-right z-20 absolute -right-2 pt-2 w-48">
                <Menu.Items className="rounded-md bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                  {loggedIn ? <AuthMenu /> : <GuestMenu />}
                </Menu.Items>
              </div>
            </Transition>
          </div>
        )}
      </Menu>
    </>
  )
}

export default ProfileMenu
