import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

import { NormalizedMenuItem } from "@lib/apollo/cache"
import { GetDesktopLinkStyleType } from "../Header"

import { MenuLink } from "@components/ui"

type DropdownProps = {
  menuItem: NormalizedMenuItem
  getStyle: GetDesktopLinkStyleType
}

const Dropdown = ({ menuItem, getStyle }: DropdownProps) => {
  const path = menuItem.path || "/"
  return (
    <Menu key={menuItem.id} as="div" className="relative h-full">
      {({ open }) => (
        <>
          <div className="flex h-full">
            <Menu.Button
              className={getStyle({
                open,
                path,
              })}
            >
              {menuItem.label}
              <ChevronDownIcon
                className={`transition ml-1 w-4 h-4 ${
                  open && "transform rotate-180"
                } text-gray-400`}
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-20 origin-top absolute -left-1/2 pt-2 w-64">
              <Menu.Items className="rounded-md bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}

                {menuItem.children &&
                  menuItem.children.map(item => (
                    <Menu.Item key={item.id}>
                      <MenuLink
                        href={item.path}
                        className="ring-transparent outline-none"
                      >
                        <a className="transition hover:bg-blue-main hover:text-white text-blue-dark block px-4 py-2 text-sm outline-none ring-transparent">
                          {item.label}
                        </a>
                      </MenuLink>
                    </Menu.Item>
                  ))}
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Dropdown
