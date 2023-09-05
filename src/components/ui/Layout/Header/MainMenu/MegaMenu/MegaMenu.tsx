"use client"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import ChevronDownIcon from "@heroicons/react/20/solid/ChevronDownIcon"

import type { MainMenuLink as MainMenuLinkType } from "~payload-types"
import MainMenuLink from "../MainMenuLink"
import Link from "@components/Link"

// ####
// #### Types
// ####

type MegaMenuProps = {
  megaItem: MainMenuLinkType[0]
}

// ####
// #### Component
// ####

const MegaMenu = ({ megaItem }: MegaMenuProps) => {
  const { link } = megaItem
  const path = link.url ?? "/"

  const headerStyle = "font-extrabold text-base text-gray-900"

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <MainMenuLink menuItem={megaItem} mega={true}>
            <ChevronDownIcon
              className={`transition ml-1 w-4 h-4 ${
                open && "transform rotate-180"
              } text-gray-400`}
            />
          </MainMenuLink>

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
              <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid grid-cols-3 min-w-full bg-white pl-8 pt-6 pb-6">
                  {/* <div className="grid grid-cols-2 gap-y-10 gap-x-8"> */}
                  {link.children &&
                    link.children.map((column, index) => {
                      const { children, header, megaColumn } = column
                      if (megaColumn) {
                        return (
                          <div key={column.id} className="">
                            {column.children &&
                              column.children.map((subColumn, subIndex) => {
                                const { label, url, children, type } = subColumn
                                return (
                                  label && (
                                    <div
                                      key={subColumn.id}
                                      className={
                                        " " +
                                        (subIndex > 0
                                          ? "mt-8"
                                          : label === "Browse All"
                                          ? "mb-8"
                                          : "")
                                      }
                                    >
                                      {type !== "textOnly" ? (
                                        <div
                                          className={headerStyle}
                                          onClick={() => close()}
                                        >
                                          <Link
                                            href={
                                              url
                                                ? url === "#"
                                                  ? ""
                                                  : url
                                                : ""
                                            }
                                            title={label}
                                            className={`${
                                              label === "Browse All"
                                                ? "text-accent hover:text-highlight"
                                                : "hover:text-accent"
                                            }  transition`}
                                          >
                                            {label}
                                          </Link>
                                        </div>
                                      ) : (
                                        <div
                                          className={headerStyle}
                                          onClick={() => close()}
                                        >
                                          <div title={label}>{label}</div>
                                        </div>
                                      )}
                                      <ul role="list" className="">
                                        {children &&
                                          children.map(
                                            (item) =>
                                              item.label && (
                                                <li
                                                  key={item.id}
                                                  className="flex w-full group"
                                                  onClick={() => close()}
                                                >
                                                  <Link
                                                    href={item.url ?? ""}
                                                    title={item.label}
                                                    className="w-full hover:text-highlight"
                                                  >
                                                    <div className="py-2 w-full">
                                                      {item.label}
                                                    </div>
                                                  </Link>
                                                </li>
                                              )
                                          )}
                                      </ul>
                                    </div>
                                  )
                                )
                              })}
                          </div>
                        )
                      } else {
                        return (
                          link.label && (
                            <div key={column.id}>
                              <div
                                id={`desktop-featured-heading-${megaItem.id}`}
                                className={headerStyle}
                                onClick={() => close()}
                              >
                                <Link href={link.url ?? ""} title={link.label}>
                                  {link.label}
                                </Link>
                              </div>
                              <ul role="list" className="mt-2">
                                {children &&
                                  children.map((child) => {
                                    const { label, url } = child
                                    return (
                                      <li
                                        key={child.id}
                                        className="flex w-full group"
                                        onClick={() => close()}
                                      >
                                        <Link
                                          href={url ?? ""}
                                          title={label ?? ""}
                                          className="w-full hover:text-gray-800"
                                        >
                                          <div className="py-2 w-full">
                                            {label}
                                          </div>
                                        </Link>
                                      </li>
                                    )
                                  })}
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
