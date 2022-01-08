import { FC, Fragment, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Menu, Transition } from "@headlessui/react"
import classNames from "classnames"

import { Underlined, underSelect } from "styles/utils"

// Remove after fetching dynamic data
import { UserMenuItem } from "./Navbar"
import { LoadingDots } from "@components/ui"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Icon = dynamic(() => import("@components/ui/Icon"), importOpts)

// ####
// #### Types
// ####

interface UsernavPropsType {
  iconSize: string
  userMenuItems: UserMenuItem[]
  searchOpen: boolean
  mobileMenuOpen: boolean
  getNavLinkClasses: (path: string, classes?: string | undefined) => string
}

// ####
// #### Component
// ####

const Usernav: FC<UsernavPropsType> = ({
  iconSize,
  searchOpen,
  userMenuItems,
  mobileMenuOpen,
  getNavLinkClasses,
}) => {
  let timeout: NodeJS.Timeout
  const timeoutDuration = 300

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

    if (mobileMenuOpen || searchOpen) {
      // Close menu if other menu/modal open
      setOpenState(false)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen, searchOpen])

  return (
    <Menu as="div" className="hidden lg:block relative lg:flex-shrink-0 h-full">
      {({ open }) => (
        <div
          onMouseEnter={() => onHover(open, "onMouseEnter")}
          onMouseLeave={() => onHover(open, "onMouseLeave")}
        >
          <div>
            <Menu.Button
              onClick={() => handleClick(open)}
              ref={buttonRef}
              className={getNavLinkClasses("#")}
            >
              <span className="sr-only">Open user menu</span>
              <Icon name="user-astronaut" className={iconSize} type="regular" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="origin-top-right z-20 absolute -right-2 pt-2 w-48">
              <Menu.Items className="rounded-md bg-white outline-none overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
                {userMenuItems.map(item => (
                  <Menu.Item key={"usernav" + item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          "transition",
                          active ? "bg-blue-main text-white" : "text-blue-dark",
                          "block px-4 py-2 text-sm",
                        )}
                      >
                        <Underlined className="target">{item.name}</Underlined>
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </div>
          </Transition>
        </div>
      )}
    </Menu>
  )
}

export default Usernav
