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

  const bigLinkStyle =
    "font-extrabold uppercase tracking-wider text-gray-800 pl-4"

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
            <div className="border-t border-gray-200 py-6 space-y-6">
              {sideMenu.map((menuItem, index) => {
                if (menuItem.mega) {
                  return (
                    <div key={menuItem.id} className="flow-root">
                      <div className={bigLinkStyle} title={menuItem.label}>
                        {menuItem.label}
                      </div>
                      <div className="pt-2">
                        {menuItem.children &&
                          menuItem.children.map(column => {
                            if (column.label === "Menu-Column") {
                              return (
                                column.children &&
                                column.children.map((subColumn, subIndex) => {
                                  return (
                                    <Disclosure key={subColumn.id}>
                                      {({ open }) => (
                                        <>
                                          <Disclosure.Button
                                            title={subColumn.label}
                                            className={`group pl-8 pr-8 flex justify-between w-full py-3 ${
                                              open
                                                ? " bg-green-main text-white"
                                                : " text-gray-600"
                                            } font-bold text-sm hover:bg-blue-main hover:text-white transition`}
                                          >
                                            <span>{subColumn.label}</span>
                                            <ChevronUpIcon
                                              className={`${
                                                open
                                                  ? "transform rotate-180 text-white "
                                                  : "text-blue-main "
                                              }w-5 h-5 transition group-hover:rotate-180 group-hover:text-white`}
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
                                              <div className="flex flex-col text-sm text-gray-600 w-full">
                                                {subColumn.children &&
                                                  subColumn.children.map(
                                                    item => {
                                                      return (
                                                        <div
                                                          key={item.id}
                                                          className="transition font-medium pl-8 w-full hover:bg-blue-main hover:text-white"
                                                          onClick={() =>
                                                            setOpen(false)
                                                          }
                                                        >
                                                          <MenuLink
                                                            href={item.path}
                                                            title={item.label}
                                                            className="w-full"
                                                          >
                                                            <div className="w-full py-3">
                                                              {item.label}
                                                            </div>
                                                          </MenuLink>
                                                        </div>
                                                      )
                                                    },
                                                  )}
                                              </div>
                                            </Disclosure.Panel>
                                          </Transition>
                                        </>
                                      )}
                                    </Disclosure>
                                  )
                                })
                              )
                            } else {
                              return (
                                <Disclosure key={column.id}>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        title={column.label}
                                        className={`group pl-8 pr-8 flex justify-between w-full py-3 ${
                                          open
                                            ? " bg-green-main text-white"
                                            : " text-gray-600"
                                        } font-bold text-sm hover:bg-blue-main hover:text-white transition`}
                                      >
                                        <span>{column.label}</span>
                                        <ChevronUpIcon
                                          className={`${
                                            open
                                              ? "transform rotate-180 text-white "
                                              : "text-blue-main "
                                          }w-5 h-5 transition group-hover:rotate-180 group-hover:text-white`}
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
                                          <div className="flex flex-col text-sm text-gray-600 w-full">
                                            {column.children &&
                                              column.children.map(item => {
                                                return (
                                                  <div
                                                    key={item.id}
                                                    className="transition font-medium pl-8 w-full hover:bg-blue-main hover:text-white"
                                                    onClick={() =>
                                                      setOpen(false)
                                                    }
                                                  >
                                                    <MenuLink
                                                      href={item.path}
                                                      title={item.label}
                                                      className="w-full"
                                                    >
                                                      <div className="w-full py-3">
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
                            }
                          })}
                      </div>
                    </div>
                  )
                }
                if (menuItem.children) {
                  return (
                    <div key={menuItem.id} className="flow-root">
                      <div className={bigLinkStyle} title={menuItem.label}>
                        {menuItem.label}
                      </div>
                      <div className="pt-2">
                        {menuItem.children.map(child => {
                          return (
                            <div
                              key={child.id}
                              className="font-bold text-sm text-gray-600 transition px-8 hover:bg-blue-main hover:text-white"
                              onClick={() => setOpen(false)}
                            >
                              <MenuLink
                                href={child.path}
                                title={child.label}
                                className=""
                              >
                                <div className="w-full py-3">{child.label}</div>
                              </MenuLink>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={menuItem.id} className="flow-root">
                    <div
                      className={bigLinkStyle}
                      onClick={() => setOpen(false)}
                    >
                      <MenuLink href={menuItem.path} title={menuItem.label}>
                        <div className="w-full">{menuItem.label}</div>
                      </MenuLink>
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
                      className="outline-none"
                      key={item.name}
                      onClick={() => setOpen(false)}
                    >
                      <MenuLink
                        href={item.href}
                        title={item.name}
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
                    title="Sign out"
                    className="transition outline-none"
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
                      title="Register"
                      className="transition flex items-center outline-none px-3.5 py-2 hover:bg-blue-main hover:text-white"
                    >
                      <ClipboardCheckIcon className="h-6 w-6 mr-4" />
                      <div>Register</div>
                    </MenuLink>
                  </div>
                  <div onClick={() => setOpen(false)} className="group">
                    <MenuLink
                      href="/login"
                      title="Sign in"
                      className="transition flex items-center outline-none text-green-main px-4 py-2 hover:bg-green-main hover:text-white"
                    >
                      <LoginIcon className="h-6 w-6 mr-3.5" />
                      <div>Sign in</div>
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
