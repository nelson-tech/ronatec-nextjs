import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon"

import { NormalizedMenuItem } from "@lib/types"
import { GetDesktopLinkStyleType } from "../Header"

import MenuLink from "@components/ui/MenuLink"

// ####
// #### Types
// ####

type DropdownProps = {
  menuItem: NormalizedMenuItem
  getStyle: GetDesktopLinkStyleType
}

// ####
// #### Component
// ####

const Dropdown = ({ menuItem, getStyle }: DropdownProps) => {
  const path = menuItem.path || "/"
  return (
    <Menu as="div" className="relative h-full">
      {({ open }) => (
        <>
          <div className="flex h-full">
            <Menu.Button
              title={menuItem.label}
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
            <div className="z-40 origin-top absolute -left-1/2 pt-2 w-64">
              <Menu.Items className="rounded-md bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 z-40">
                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}

                {menuItem.children &&
                  menuItem.children.map((item, index) => (
                    <Menu.Item key={menuItem.label + index + item.label}>
                      <MenuLink
                        href={item.path}
                        title={item.label}
                        className="transition hover:bg-blue-main hover:text-white text-gray-700 block px-4 py-2 text-sm ring-transparent outline-none"
                      >
                        {item.label}
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
