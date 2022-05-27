import { Fragment, memo } from "react"
import { Dialog, Disclosure, Transition } from "@headlessui/react"
import ClipboardCheckIcon from "@heroicons/react/outline/ClipboardCheckIcon"
import LoginIcon from "@heroicons/react/outline/LoginIcon"
import LogoutIcon from "@heroicons/react/outline/LogoutIcon"
import XIcon from "@heroicons/react/outline/XIcon"
import ChevronUpIcon from "@heroicons/react/solid/ChevronUpIcon"

import mobileMenu from "@lib/menus/mobile"
import userMenu from "@lib/userMenu"
import useLogout from "@lib/hooks/auth/useLogout"
import useStore from "@lib/hooks/useStore"

import Link from "@components/Link"

// ####
// #### Component
// ####

const MenuPane = memo(function MenuPane() {
  const loggedIn = useStore(state => state.auth.loggedIn)
  const setOpen = useStore(state => state.ui.setMobileMenuOpen)

  const { logout } = useLogout()

  const handleLogout = async () => {
    setOpen(false)
    await logout()
  }

  const bigLinkStyle =
    "font-extrabold uppercase tracking-wider text-gray-800 pl-4"

  return (
    <>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Dialog.Panel
          className="relative w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
          style={{ maxWidth: "350px" }}
        >
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
            {mobileMenu.map((menuItem, index) => {
              if (menuItem.mega) {
                return (
                  <div
                    key={menuItem.label + index + menuItem.path}
                    className="flow-root"
                  >
                    <div className={bigLinkStyle} title={menuItem.label}>
                      {menuItem.label}
                    </div>
                    <div className="pt-2">
                      {menuItem.children &&
                        menuItem.children.map((column, colIndex) => {
                          if (column.label === "Menu-Column") {
                            return (
                              column.children &&
                              column.children.map((subColumn, subIndex) => {
                                return (
                                  <Disclosure
                                    key={
                                      menuItem.label +
                                      index +
                                      colIndex +
                                      subIndex +
                                      subColumn.label +
                                      subColumn.path
                                    }
                                  >
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
                                                subColumn.children.map(item => {
                                                  return (
                                                    <div
                                                      key={
                                                        menuItem.path +
                                                        subIndex +
                                                        subColumn.path +
                                                        item.label +
                                                        item.path
                                                      }
                                                      className="transition font-medium pl-8 w-full hover:bg-blue-main hover:text-white"
                                                      onClick={() =>
                                                        setOpen(false)
                                                      }
                                                    >
                                                      <Link
                                                        href={item.path}
                                                        title={item.label}
                                                        className="w-full"
                                                      >
                                                        <div className="w-full py-3">
                                                          {item.label}
                                                        </div>
                                                      </Link>
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
                              })
                            )
                          } else {
                            if (column.children) {
                              return (
                                <Disclosure
                                  key={
                                    menuItem.label +
                                    index +
                                    colIndex +
                                    column.label
                                  }
                                >
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
                                          <div className="flex flex-col text-sm bg-gray-100 text-gray-600 w-full">
                                            {column.children &&
                                              column.children.map(item => {
                                                return (
                                                  <div
                                                    key={
                                                      menuItem.path +
                                                      colIndex +
                                                      item.label +
                                                      item.path
                                                    }
                                                    className="transition font-medium pl-8 w-full hover:bg-blue-main hover:text-white"
                                                    onClick={() =>
                                                      setOpen(false)
                                                    }
                                                  >
                                                    <Link
                                                      href={item.path}
                                                      title={item.label}
                                                      className="w-full"
                                                    >
                                                      <div className="w-full py-3">
                                                        {item.label}
                                                      </div>
                                                    </Link>
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
                            } else {
                              return (
                                <Link
                                  key={
                                    menuItem.label +
                                    index +
                                    colIndex +
                                    column.label
                                  }
                                  href={column.path}
                                  title={column.label}
                                  className="py-3 text-gray-600 flex font-bold text-sm pl-8 pr-8 w-full h-full hover:bg-blue-main hover:text-white transition"
                                >
                                  {column.label}
                                </Link>
                              )
                            }
                          }
                        })}
                    </div>
                  </div>
                )
              }
              if (menuItem.children) {
                return (
                  <div
                    key={menuItem.label + menuItem.path}
                    className="flow-root"
                  >
                    <div className={bigLinkStyle} title={menuItem.label}>
                      {menuItem.label}
                    </div>
                    <div className="pt-2">
                      {menuItem.children.map(child => {
                        return (
                          <div
                            key={
                              menuItem.path +
                              menuItem.label +
                              child.label +
                              child.path
                            }
                            className="font-bold text-sm text-gray-600 transition px-8 hover:bg-blue-main hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            <Link
                              href={child.path}
                              title={child.label}
                              className=""
                            >
                              <div className="w-full py-3">{child.label}</div>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
              return (
                <div key={menuItem.path + menuItem.label} className="flow-root">
                  <div className={bigLinkStyle} onClick={() => setOpen(false)}>
                    <Link href={menuItem.path} title={menuItem.label}>
                      <div className="w-full">{menuItem.label}</div>
                    </Link>
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
                    key={item.name + item.href}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={item.href}
                      title={item.name}
                      className="transition flex items-center px-3.5 py-2 hover:bg-blue-main hover:text-white"
                    >
                      {item.icon({ className: "h-6 w-6 mr-4" })}
                      <div>{item.name}</div>
                    </Link>
                  </div>
                ))}
                <div
                  onClick={handleLogout}
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
                  <Link
                    href="/register"
                    title="Register"
                    className="transition flex items-center outline-none px-3.5 py-2 hover:bg-blue-main hover:text-white"
                  >
                    <ClipboardCheckIcon className="h-6 w-6 mr-4" />
                    <div>Register</div>
                  </Link>
                </div>
                <div onClick={() => setOpen(false)} className="group">
                  <Link
                    href="/login"
                    title="Sign in"
                    className="transition flex items-center outline-none text-green-main px-4 py-2 hover:bg-green-main hover:text-white"
                  >
                    <LoginIcon className="h-6 w-6 mr-3.5" />
                    <div>Sign in</div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </>
  )
})

export default MenuPane
