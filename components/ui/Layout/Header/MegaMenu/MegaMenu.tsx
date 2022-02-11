import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/solid/ChevronDownIcon"

import { NormalizedMenuItem } from "@lib/types"
import { GetDesktopLinkStyleType } from "../Header"

import MenuLink from "@components/ui/MenuLink"

// ####
// #### Types
// ####

type MegaMenuProps = {
  megaItem: NormalizedMenuItem
  getStyle: GetDesktopLinkStyleType
}

// ####
// #### Component
// ####

const MegaMenu = ({ megaItem, getStyle }: MegaMenuProps) => {
  const path = megaItem.path || "/"

  const headerStyle = "font-extrabold text-base text-gray-900"
  return (
    <Popover as="div">
      {({ open, close }) => (
        <>
          <div className="relative flex">
            <Popover.Button
              className={getStyle({
                open,
                path,
              })}
            >
              {megaItem.label}
              <ChevronDownIcon
                className={`transition ml-1 w-4 h-4 ${
                  open && "transform rotate-180"
                } text-gray-400`}
              />
            </Popover.Button>
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
            <Popover.Panel className="absolute top-full inset-x-0 text-gray-500 sm:text-sm z-20">
              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
              <div
                className="absolute inset-0 top-1/2 bg-white shadow"
                aria-hidden="true"
              />

              <div className="relative bg-white">
                <div className="max-w-7xl mx-auto px-8">
                  <div className="grid grid-cols-3 items-start ml-8 pt-6 pb-6">
                    {/* <div className="grid grid-cols-2 gap-y-10 gap-x-8"> */}
                    {megaItem.children &&
                      megaItem.children.map((column, index) => {
                        if (column.label === "Menu-Column") {
                          return (
                            <div key={column.label + index + column.path}>
                              {column.children &&
                                column.children.map((subColumn, subIndex) => {
                                  return (
                                    <div
                                      key={
                                        column.label +
                                        subColumn.label +
                                        subColumn.path
                                      }
                                      className={
                                        subIndex > 0
                                          ? "mt-8"
                                          : subColumn.label === "Browse All"
                                          ? "mb-8"
                                          : ""
                                      }
                                    >
                                      <p
                                        id={`desktop-featured-heading-${megaItem.id}`}
                                        className={headerStyle}
                                        onClick={() => close()}
                                      >
                                        <MenuLink
                                          href={subColumn.path}
                                          title={subColumn.label}
                                          className={`${
                                            subColumn.label === "Browse All"
                                              ? "text-blue-main hover:text-green-main"
                                              : "hover:text-blue-main"
                                          }  transition`}
                                        >
                                          {subColumn.label}
                                        </MenuLink>
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby={`desktop-featured-heading-${megaItem.id}`}
                                        className=""
                                      >
                                        {subColumn.children &&
                                          subColumn.children.map(item => (
                                            <li
                                              key={
                                                subColumn.label +
                                                item.label +
                                                item.path
                                              }
                                              className="flex w-full group"
                                              onClick={() => close()}
                                            >
                                              <MenuLink
                                                href={item.path}
                                                title={item.label}
                                                className="w-full hover:text-green-main"
                                              >
                                                <div className="py-2 w-full">
                                                  {item.label}
                                                </div>
                                              </MenuLink>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  )
                                })}
                            </div>
                          )
                        } else {
                          return (
                            <div key={column.label + index + column.path}>
                              <p
                                id={`desktop-featured-heading-${megaItem.id}`}
                                className={headerStyle}
                                onClick={() => close()}
                              >
                                <MenuLink
                                  href={column.path}
                                  title={column.label}
                                >
                                  {column.label}
                                </MenuLink>
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`desktop-featured-heading-${megaItem.id}`}
                                className="mt-2"
                              >
                                {column.children &&
                                  column.children.map(item => (
                                    <li
                                      key={item.id}
                                      className="flex w-full group"
                                      onClick={() => close()}
                                    >
                                      <MenuLink
                                        href={item.path}
                                        title={item.label}
                                        className="w-full hover:text-gray-800"
                                      >
                                        <div className="py-2 w-full">
                                          {item.label}
                                        </div>
                                      </MenuLink>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )
                        }
                      })}
                  </div>
                </div>
              </div>
              {/* </div> */}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default MegaMenu
