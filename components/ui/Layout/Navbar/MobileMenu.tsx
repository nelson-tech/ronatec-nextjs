import { FC, Fragment, MutableRefObject, ReactFragment } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Popover, Transition } from "@headlessui/react"
import tw from "twin.macro"

import { NormalizedMenuItem } from "@lib/apollo/cache"

// Remove after fetching dynamic data
// import { UserMenuItem } from "./Navbar"
import { LoadingDots } from "@components/ui"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Icon = dynamic(() => import("@components/ui/Icon"), importOpts)

// ####
// #### Types
// ####

export interface MobileMenuPropsType {
  iconSize: string
  menuItems: NormalizedMenuItem[]
  currentPath: string
  userMenuItems: []
  closeMenu: (
    focusableElement?:
      | HTMLElement
      | MutableRefObject<HTMLElement | null>
      | undefined,
  ) => void
  logo: ReactFragment
}

// ####
// #### Component
// ####

const MobileMenu: FC<MobileMenuPropsType> = ({
  iconSize,
  menuItems,
  currentPath,
  userMenuItems,
  closeMenu,
  logo,
}) => {
  return (
    <div className="relative flex items-center justify-center pb-1 lg:hidden">
      <Transition.Root as={Fragment}>
        <div className="">
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                <div className="pt-3 pb-2">
                  <div className="flex items-center justify-between px-4">
                    <div className="text-blue-dark">{logo}</div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 transition hover:text-gray-500 hover:bg-blue-light outline-none">
                        <span className="sr-only">Close menu</span>

                        <Icon name="times" className={iconSize} />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1 w-full relative">
                    {menuItems.map(item => (
                      <Link key={item.label} href={item.path || "/"} passHref>
                        <span onClick={e => closeMenu()} className="w-full">
                          <a
                            href={item.path || "/"}
                            css={[
                              item.path == currentPath
                                ? tw`text-black font-bold`
                                : tw`text-gray-900 font-medium`,
                              tw`block rounded-md px-3 py-2 text-base hover:bg-blue-light hover:text-gray-800`,
                            ]}
                            aria-current={
                              item.path == currentPath ? "page" : undefined
                            }
                          >
                            {item.label}
                          </a>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pb-2">
                  <div className="mt-3 px-2 space-y-1">
                    {/* {userMenuItems.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-blue-light hover:text-gray-800"
                      >
                        {item.name}
                      </a>
                    ))} */}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition.Child>
        </div>
      </Transition.Root>
    </div>
  )
}

export default MobileMenu
