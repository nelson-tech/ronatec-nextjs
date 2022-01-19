import { Fragment, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import classNames from "classnames"
import { Menu, Transition } from "@headlessui/react"

import { NormalizedMenuItem } from "@lib/types"
import { Underlined, underSelect } from "styles/utils"

// import { LoadingDots } from "@components/ui"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Icon = dynamic(() => import("@components/ui/Icon"), importOpts)

// ####
// #### Types
// ####

type Props = {
  item: NormalizedMenuItem
  currentPath: string
  getNavLinkClasses: (path: string, classes?: string | undefined) => string
  getDropdownLinkClasses: (path: string, classes?: string | undefined) => string
}

// ####
// #### Component
// ####

const MenuDropdown = ({
  item,
  currentPath,
  getNavLinkClasses,
  getDropdownLinkClasses,
}: Props) => {
  // https://github.com/tailwindlabs/headlessui/issues/239#issuecomment-850718610

  let timeout: NodeJS.Timeout
  const timeoutDuration = 200

  const buttonRef = useRef<HTMLButtonElement>(null)
  const [openState, setOpenState] = useState(false)

  const toggleMenu = (open: boolean) => {
    // log the current open state in React (toggle open state)
    setOpenState(openState => !openState)
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click() // eslint-disable-line
  }

  // Open the menu after a delay of timeoutDuration
  const onHover = (open: boolean, action: string) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout)
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
    }
    // else: don't click! 😁
  }

  const handleClick = (open: boolean) => {
    setOpenState(!open) // toggle open state in React state
    clearTimeout(timeout) // stop the hover timer if it's running
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const submenu = item.children!

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <div
          onMouseEnter={() => onHover(open, "onMouseEnter")}
          onMouseLeave={() => onHover(open, "onMouseLeave")}
        >
          <div>
            <Menu.Button
              onClick={() => handleClick(open)}
              ref={buttonRef}
              className="outline-none"
            >
              <Link href={item.path} passHref>
                <a
                  className={getNavLinkClasses(
                    item.path,
                    classNames(
                      "inline-flex align-middle",
                      open ? "bg-white bg-opacity-10 " : "",
                    ),
                  )}
                  title={item.label}
                >
                  {item.label}
                  <Icon
                    name="chevron-down"
                    className="w-5 h-5 px-1 ml-2 mr-1"
                    aria-hidden="true"
                    iconStyling="hover:text-gray-400"
                  />
                </a>
              </Link>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="pt-4 absolute right-0 w-56 origin-top-right z-20">
              <Menu.Items className="bg-white divide-y divide-gray-100 overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5 outline-none">
                <div className="">
                  {submenu.map(subItem => {
                    return (
                      <Menu.Item key={"subItem" + subItem.label}>
                        {({ active }) => (
                          <Link href={subItem.path} passHref>
                            <a
                              className={getDropdownLinkClasses(subItem.path)}
                              css={underSelect}
                              title={subItem.label}
                            >
                              {subItem.label}
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            </div>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

export default MenuDropdown
