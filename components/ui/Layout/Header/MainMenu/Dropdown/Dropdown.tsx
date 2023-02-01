"use client"

import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"

import { MenuItem } from "@api/codegen/graphql"
import { GetDesktopLinkStyleType } from "../MainMenu"

import Link from "@components/Link"

// ####
// #### Types
// ####

type DropdownProps = {
  menuItem: MenuItem
  getStyle: GetDesktopLinkStyleType
}

// ####
// #### Component
// ####

const Dropdown = ({ menuItem, getStyle }: DropdownProps) => {
  const path = menuItem.url || "/"
  return (
    <Menu as="div" className="relative h-full">
      {({ open }) => (
        <>
          <Menu.Button
            title={menuItem.label ?? ""}
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

                {menuItem.childItems?.nodes &&
                  menuItem.childItems.nodes.map(
                    (item: MenuItem, index) =>
                      item.label && (
                        <Menu.Item
                          key={item.id}
                          as={Link}
                          href={item.url ?? ""}
                          title={item.label ?? undefined}
                          className="transition hover:bg-accent hover:text-white text-gray-700 block px-4 py-2 text-sm ring-transparent outline-none"
                        >
                          {item.label}
                        </Menu.Item>
                      ),
                  )}
              </Menu.Items>
            </div>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default Dropdown
