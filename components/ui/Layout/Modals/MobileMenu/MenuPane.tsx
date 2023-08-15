import { Fragment, memo } from "react"
import { Dialog, Disclosure, Transition } from "@headlessui/react"
import { ChevronUpIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline"

import useAuth from "@hooks/useAuth"
import useStore from "@hooks/useStore"
import customerMenu from "@utils/customerMenu"

import Link from "@components/Link"
import LoginIcon from "@components/icons/Login"
import { MobileMenuLink } from "payload/generated-types"

// ####
// #### Types
// ####

type MenuPaneInputType = {
  menuItems: MobileMenuLink
}

// ####
// #### Component
// ####

const MenuPane = memo(function MenuPane({ menuItems }: MenuPaneInputType) {
  const loggedIn = useStore((state) => state.auth.loggedIn)
  const setOpen = useStore((state) => state.ui.setMobileMenuOpen)

  const { logout } = useAuth()

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
          className="relative w-full bg-white shadow-xl rounded-r pb-12 flex flex-col overflow-y-auto"
          style={{ maxWidth: "350px" }}
        >
          <div className="px-4 pt-5 pb-2 flex">
            <button
              type="button"
              className="-m-2 p-2 rounded inline-flex items-center justify-center text-gray-400 outline-none ring-transparent"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Links */}
          <div className="border-t border-gray-200 py-6 space-y-6">
            {menuItems?.map(({ link: mobileLink, id }) => {
              const { label, url, type, children } = mobileLink

              return (
                <div key={id} className="flow-root">
                  <div
                    className="font-extrabold uppercase tracking-wider text-gray-800 pl-4"
                    title={label ?? ""}
                    onClick={() => url && setOpen(false)}
                  >
                    {type !== "textOnly" && url ? (
                      <Link
                        href={url ?? ""}
                        title={label ?? ""}
                        className="w-full"
                      >
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </div>
                  {(children?.length ?? 0) > 0 && (
                    <div className="pt-2">
                      {children?.map(
                        ({ id, label, url, type, children: subChildren }) => {
                          return subChildren?.length ?? 0 > 0 ? (
                            <Disclosure key={id}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    title={label ?? ""}
                                    className={`group pl-8 pr-8 flex justify-between w-full py-3 ${
                                      open
                                        ? " bg-highlight text-white"
                                        : " text-gray-600"
                                    } font-bold text-sm hover:bg-accent hover:text-white transition`}
                                  >
                                    <span>{label}</span>
                                    <ChevronUpIcon
                                      className={`${
                                        open
                                          ? "transform rotate-180 text-white "
                                          : "text-accent "
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
                                        {subChildren?.map((item) => {
                                          return (
                                            <div
                                              key={item.id}
                                              className="transition font-medium pl-8 w-full hover:bg-accent hover:text-white"
                                              onClick={() => setOpen(false)}
                                            >
                                              <Link
                                                href={item?.url ?? ""}
                                                title={item?.label ?? ""}
                                                className="w-full"
                                              >
                                                <div className="w-full py-3">
                                                  {item?.label}
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
                          ) : (
                            <Link
                              key={id}
                              href={url ?? ""}
                              title={label ?? ""}
                              onClick={() => setOpen(false)}
                              className="py-3 text-gray-600 flex font-bold text-sm pl-8 pr-8 w-full h-full hover:bg-accent hover:text-white transition"
                            >
                              {label}
                            </Link>
                          )
                        }
                      )}
                    </div>
                  )}
                </div>
              )
            })}{" "}
          </div>

          <div className="border-t border-gray-200 py-6 text-sm font-bold text-gray-600">
            {loggedIn ? (
              <>
                {customerMenu.map((item) => (
                  <div
                    className="outline-none"
                    key={item.name + item.href}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={item.href}
                      title={item.name}
                      className="transition flex items-center px-3.5 py-2 hover:bg-accent hover:text-white"
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
                    {/* <LogoutIcon className="h-6 w-6 mr-3.5" /> */}
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
                    className="transition flex items-center outline-none px-3.5 py-2 hover:bg-accent hover:text-white"
                  >
                    <ClipboardDocumentCheckIcon className="h-6 w-6 mr-4" />
                    <div>Register</div>
                  </Link>
                </div>
                <div onClick={() => setOpen(false)} className="group">
                  <Link
                    href="/login"
                    title="Sign in"
                    className="transition flex items-center outline-none text-highlight px-4 py-2 hover:bg-highlight hover:text-white"
                  >
                    <LoginIcon size={6} styling="mr-3.5" />
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
