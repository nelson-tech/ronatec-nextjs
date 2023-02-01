"use client"

import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"

import { MenuItem } from "@api/codegen/graphql"
import { GetDesktopLinkStyleType } from "../MainMenu"

import Link from "@components/Link"

// ####
// #### Types
// ####

type MegaMenuProps = {
  megaItem: MenuItem

  getStyle: GetDesktopLinkStyleType
}

// ####
// #### Component
// ####

const MegaMenu = ({ megaItem, getStyle }: MegaMenuProps) => {
  const path = megaItem.url || "/"

  const headerStyle = "font-extrabold text-base text-gray-900"

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
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

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className=" text-gray-500 sm:text-sm absolute left-[-10rem] z-40 mt-3 w-screen max-w-sm md:max-w-3xl lg:max-w-[63rem]">
              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
              {/* <div
                className="absolute inset-0 top-1/2 w-screen bg-white shadow"
                aria-hidden="true"
              /> */}
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-3 min-w-full bg-white pl-8 pt-6 pb-6">
                  {/* <div className="grid grid-cols-2 gap-y-10 gap-x-8"> */}
                  {megaItem.childItems?.nodes &&
                    megaItem.childItems.nodes.map((column: MenuItem, index) => {
                      if (column.menuFields?.column) {
                        return (
                          <div key={column.id} className="">
                            {column.childItems?.nodes &&
                              column.childItems.nodes.map(
                                (subColumn: MenuItem, subIndex) => {
                                  return (
                                    subColumn.label && (
                                      <div
                                        key={subColumn.id}
                                        className={
                                          " " +
                                          (subIndex > 0
                                            ? "mt-8"
                                            : subColumn.label === "Browse All"
                                            ? "mb-8"
                                            : "")
                                        }
                                      >
                                        <p
                                          className={headerStyle}
                                          onClick={() => close()}
                                        >
                                          <Link
                                            href={subColumn.url ?? ""}
                                            title={subColumn.label}
                                            className={`${
                                              subColumn.label === "Browse All"
                                                ? "text-accent hover:text-green-main"
                                                : "hover:text-accent"
                                            }  transition`}
                                          >
                                            {subColumn.label}
                                          </Link>
                                        </p>
                                        <ul role="list" className="">
                                          {subColumn.childItems?.nodes &&
                                            subColumn.childItems.nodes.map(
                                              (item: MenuItem) =>
                                                item.label && (
                                                  <li
                                                    key={item.id}
                                                    className="flex w-full group"
                                                    onClick={() => close()}
                                                  >
                                                    <Link
                                                      href={item.url ?? ""}
                                                      title={item.label}
                                                      className="w-full hover:text-green-main"
                                                    >
                                                      <div className="py-2 w-full">
                                                        {item.label}
                                                      </div>
                                                    </Link>
                                                  </li>
                                                ),
                                            )}
                                        </ul>
                                      </div>
                                    )
                                  )
                                },
                              )}
                          </div>
                        )
                      } else {
                        return (
                          column.label && (
                            <div key={column.label + index + column.url}>
                              <p
                                id={`desktop-featured-heading-${megaItem.id}`}
                                className={headerStyle}
                                onClick={() => close()}
                              >
                                <Link
                                  href={column.url ?? ""}
                                  title={column.label}
                                >
                                  {column.label}
                                </Link>
                              </p>
                              <ul role="list" className="mt-2">
                                {column.childItems?.nodes &&
                                  column.childItems.nodes.map(
                                    (item: MenuItem) => (
                                      <li
                                        key={item.id}
                                        className="flex w-full group"
                                        onClick={() => close()}
                                      >
                                        <Link
                                          href={item.url ?? ""}
                                          title={item.label ?? ""}
                                          className="w-full hover:text-gray-800"
                                        >
                                          <div className="py-2 w-full">
                                            {item.label}
                                          </div>
                                        </Link>
                                      </li>
                                    ),
                                  )}
                              </ul>
                            </div>
                          )
                        )
                      }
                    })}
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
