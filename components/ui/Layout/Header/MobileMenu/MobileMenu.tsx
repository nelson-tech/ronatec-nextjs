import { Dispatch, Fragment, SetStateAction } from "react"
import { useRouter } from "next/router"
import { Dialog, Disclosure, Transition } from "@headlessui/react"
import {
  ClipboardCheckIcon,
  LoginIcon,
  LogoutIcon,
  XIcon,
} from "@heroicons/react/outline"
import { ChevronUpIcon } from "@heroicons/react/solid"

import { NormalizedMenuItem } from "@lib/types"
import { useAuth } from "@lib/hooks"

import { MenuLink } from "@components/ui"
import { MobileMenuPane } from "./style"
import userMenu from "../userMenu"

type MobileMenuProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  menu: NormalizedMenuItem[]
}

const MobileMenu = ({ open, setOpen, menu }: MobileMenuProps) => {
  const router = useRouter()
  const { loggedIn, logout } = useAuth()

  const sideMenu = menu.filter(
    item => !["Home", "RonaBev", "RonaTank"].includes(item.label),
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <MobileMenuPane>
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400 outline-none ring-transparent"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {sideMenu.map((menuItem, index) => {
                if (menuItem.mega) {
                  return (
                    <div key={menuItem.id} className="flow-root">
                      <div className="font-extrabold">{menuItem.label}</div>
                      <div className="pt-2">
                        {menuItem.children &&
                          menuItem.children.map(column => {
                            return (
                              <Disclosure key={column.id}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button
                                      className={`group flex justify-between w-full px-4 py-2 rounded-md${
                                        open
                                          ? " bg-blue-main text-white"
                                          : " text-gray-600"
                                      } font-bold text-sm`}
                                    >
                                      <span>{column.label}</span>
                                      <ChevronUpIcon
                                        className={`${
                                          open
                                            ? "transform rotate-180 text-white "
                                            : "text-blue-main "
                                        }w-5 h-5 transition group-hover:rotate-180`}
                                      />
                                    </Disclosure.Button>
                                    <Transition
                                      enter="transition duration-100 ease-out"
                                      enterFrom="transform scale-95 opacity-0"
                                      enterTo="transform scale-100 opacity-100"
                                      leave="transition duration-75 ease-out"
                                      leaveFrom="transform scale-100 opacity-100"
                                      leaveTo="transform scale-95 opacity-0"
                                    >
                                      <Disclosure.Panel className="w-full">
                                        <div className="flex flex-col text-sm ml-6 py-2 text-gray-600 w-full">
                                          {column.children &&
                                            column.children.map(item => {
                                              return (
                                                <div
                                                  key={item.id}
                                                  className="hover:text-gray-800 transition font-medium py-2 w-full"
                                                  onClick={() => setOpen(false)}
                                                >
                                                  <MenuLink
                                                    href={item.path}
                                                    className="w-full"
                                                  >
                                                    <div className="w-full">
                                                      {item.label}
                                                    </div>
                                                  </MenuLink>
                                                </div>
                                              )
                                            })}
                                        </div>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            )
                          })}
                      </div>
                    </div>
                  )
                }
                if (menuItem.children) {
                  return (
                    <div key={menuItem.id} className="flow-root">
                      <div className="font-extrabold">
                        {menuItem.label}
                        <div className="pt-2">
                          {menuItem.children.map(child => {
                            return (
                              <div
                                key={child.id}
                                className="font-bold text-sm text-gray-600 py-2 px-4"
                                onClick={() => setOpen(false)}
                              >
                                <MenuLink href={child.path} className="">
                                  <div className="w-full">{child.label}</div>
                                </MenuLink>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={menuItem.id} className="flow-root">
                    <div
                      className="font-extrabold"
                      onClick={() => setOpen(false)}
                    >
                      <MenuLink href={menuItem.path}>{menuItem.label}</MenuLink>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-200 py-6 text-sm font-bold text-gray-600">
              {loggedIn ? (
                <>
                  {userMenu.map(item => (
                    <div
                      className="outline-none ring-transparent"
                      key={item.name}
                      onClick={() => setOpen(false)}
                    >
                      <MenuLink
                        href={item.href}
                        className="transition flex items-center px-3.5 py-2 hover:bg-blue-main hover:text-white"
                      >
                        {item.icon({ className: "h-6 w-6 mr-4" })}
                        <div>{item.name}</div>
                      </MenuLink>
                    </div>
                  ))}
                  <div
                    onClick={() =>
                      logout(() => {
                        setOpen(false)
                        router.push("/")
                      })
                    }
                    className="transition outline-none ring-transparent"
                  >
                    <div className="flex items-center w-full px-4 py-2 transition text-red-main hover:bg-red-main hover:text-white cursor-pointer">
                      <LogoutIcon className="h-6 w-6 mr-3.5" />
                      Sign out
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="group" onClick={() => setOpen(false)}>
                    <MenuLink
                      href="/register"
                      className="transition flex items-center outline-none ring-transparent px-3.5 py-2 hover:bg-blue-main hover:text-white"
                    >
                      <ClipboardCheckIcon className="h-6 w-6 mr-4" />
                      <div>Register</div>
                    </MenuLink>
                  </div>
                  <div
                    onClick={() => setOpen(false)}
                    className="transition outline-none ring-transparent text-green-main px-4 py-2 hover:bg-green-main hover:text-white"
                  >
                    <MenuLink href="/login" className="flex items-center">
                      <LoginIcon className="h-6 w-6 mr-3.5" />
                      <div className="target">Sign in</div>
                    </MenuLink>
                  </div>
                </>
              )}
            </div>
          </MobileMenuPane>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
