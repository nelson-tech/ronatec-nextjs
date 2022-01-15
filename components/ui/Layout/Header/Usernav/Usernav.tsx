import { Dispatch, FC, Fragment, SetStateAction } from "react"
import { Menu, Transition } from "@headlessui/react"

import { Underlined, underSelect } from "styles/utils"

// Remove after fetching dynamic data
import {
  ClipboardCheckIcon,
  LoginIcon,
  LogoutIcon,
  UserIcon,
} from "@heroicons/react/outline"
import { useAuth } from "@lib/hooks"
import { logout } from "@lib/apollo/auth"
import { useRouter } from "next/router"
import { MenuLink } from "@components/ui"
import userMenu from "../userMenu"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// ####
// #### Types
// ####

interface UsernavPropsType {
  iconSize: string
  setSignInOpen: Dispatch<SetStateAction<boolean>>
  mobileMenuOpen: boolean
}

// ####
// #### Component
// ####

const Usernav: FC<UsernavPropsType> = ({ iconSize, setSignInOpen }) => {
  const router = useRouter()
  const auth = useAuth()

  return (
    <Menu as="div" className="hidden lg:block relative lg:flex-shrink-0 h-full">
      {({ open }) => (
        <div>
          <div className="h-full">
            <Menu.Button
              className={`font-bold text-sm rounded-md py-2 outline-none ${
                auth?.isLoggedIn() ? "text-green-main" : "text-gray-400"
              } hover:text-gray-500`}
            >
              <span className="sr-only">Open user menu</span>
              <UserIcon className={" " + iconSize} />
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
                {auth && auth.isLoggedIn() ? (
                  <>
                    {userMenu.map(item => (
                      <Menu.Item key={"usernav" + item.name}>
                        <MenuLink
                          href={item.href}
                          className="transition flex items-center hover:bg-blue-main hover:text-white text-blue-dark px-4 py-2 text-sm"
                        >
                          {item.icon({ className: "h-4 w-4 mr-2" })}
                          {item.name}
                        </MenuLink>
                      </Menu.Item>
                    ))}

                    <Menu.Item>
                      <div
                        className="transition flex cursor-pointer items-center text-red-main px-4 py-2 text-sm hover:bg-red-main hover:text-white"
                        onClick={() => logout(() => router.push("/"))}
                      >
                        <LogoutIcon className="h-4 w-4 mr-1.5" />
                        <Underlined className="target">Sign out</Underlined>
                      </div>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      <div
                        onClick={() => setSignInOpen(true)}
                        className="transition cursor-pointer flex items-center outline-none ring-transparent text-green-main px-4 py-2 text-sm hover:bg-green-main hover:text-white"
                      >
                        <LoginIcon className="h-4 w-4 mr-1.5" />
                        <div className="target">Sign in</div>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div className="group">
                        <MenuLink href="/register">
                          <a className="transition flex items-center text-blue-dark outline-none ring-transparent px-3.5 py-2 text-sm hover:bg-blue-main hover:text-white">
                            <ClipboardCheckIcon className="h-4 w-4 mr-2" />
                            <div className="target">Register</div>
                          </a>
                        </MenuLink>
                      </div>
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </div>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

export default Usernav
