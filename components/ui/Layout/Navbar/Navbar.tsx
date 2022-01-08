import { FC, Fragment, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import Link from "next/link"
import { useReactiveVar } from "@apollo/client"
import { Popover } from "@headlessui/react"
import classNames from "classnames"

import { menuItemsVar } from "@lib/apollo/cache"

import { LoadingDots } from "@components/ui"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Icon = dynamic(() => import("@components/ui/Icon"), importOpts)
const MobileMenu = dynamic(
  () => import("@components/ui/Layout/Navbar/MobileMenu"),
  importOpts,
)
const Usernav = dynamic(
  () => import("@components/ui/Layout/Navbar/Usernav"),
  importOpts,
)
const MenuDropdown = dynamic(
  () => import("@components/ui/Layout/Navbar/MenuDropdown"),
  importOpts,
)
const SearchModal = dynamic(
  () => import("@components/ui/SearchModal"),
  importOpts,
)

// ####
// #### Types
// ####

export interface UserMenuItem {
  name: string
  href: string
}

// ####
// #### Component
// ####

const Navbar: FC = () => {
  const router = useRouter()
  const menuItems = useReactiveVar(menuItemsVar)

  const logo = (
    <Fragment>
      <Icon
        name="globe-americas"
        type="regular"
        className="h-8 w-8 text-white"
      />
    </Fragment>
  )
  const iconSize = "h-6 w-6 "

  const linkStyle =
    "text-accents-6 leading-6 font-medium transition hover:text-accents-9 hover:cursor-pointer"

  const userNavigation: UserMenuItem[] = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ]

  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
    return () => {
      window.removeEventListener("scroll", isSticky)
    }
  })

  const isSticky = (e: Event) => {
    const header = document.querySelector(".header-section")
    const scrollTop = window.scrollY
    scrollTop >= 250
      ? header?.classList.add("is-sticky")
      : header?.classList.remove("is-sticky")
  }

  const getNavLinkClasses = (path: string, classes?: string): string => {
    return classNames(
      (router.pathname.slice(0, path.length) === path && path !== "/") ||
        path === router.pathname
        ? "text-white bg-black bg-opacity-20"
        : "text-gray-100 bg-white bg-opacity-0",
      "font-bold text-sm rounded-md px-3 py-2 outline-none",
      "hover:bg-white hover:bg-opacity-10",
      classes,
    )
  }

  const getDropdownLinkClasses = (path: string, classes?: string): string => {
    return classNames(
      path === router.pathname ? "cursor-none" : "target",
      "items-center w-full px-4 py-2 text-sm block",
      "transition",
      "hover:bg-blue-dark hover:text-white font-semibold",
      "text-blue-dark",
      classes,
    )
  }

  return (
    <Popover as="header" className="bg-blue-main shadow-lg border-0 z-20">
      {({ open, close }) => (
        <>
          <div className="max-w-3xl mx-auto py-2 lg:py-4 px-4 lg:max-w-7xl lg:px-8">
            <div className="relative flex justify-end items-center lg:justify-between">
              {/* Logo */}
              <div className="absolute py-1.5 top-0 left-0 lg:static">
                <Link href="/">
                  <a className="text-white">
                    <span className="sr-only">Ronatec C2C, Inc.</span>
                    {logo}
                  </a>
                </Link>
              </div>

              {/* Menu on Desktop */}
              <div className="hidden lg:block w-full">
                <nav className="flex space-x-4 items-center ml-4">
                  {menuItems.map(item => {
                    if (item.children) {
                      return (
                        <MenuDropdown
                          item={item}
                          currentPath={router.pathname}
                          getNavLinkClasses={getNavLinkClasses}
                          getDropdownLinkClasses={getDropdownLinkClasses}
                          key={"dropdown" + item.label}
                        />
                      )
                    }

                    const path = item.path || "/"

                    return (
                      <div key={item.path} className="cursor-pointer">
                        <Link href={path}>
                          <a
                            href={path}
                            className={getNavLinkClasses(path)}
                            title={item.label}
                            aria-current={
                              path === router.pathname ? "page" : undefined
                            }
                          >
                            {item.label}
                          </a>
                        </Link>
                      </div>
                    )
                  })}
                </nav>
              </div>

              <div className="ml-4 flex pr-0.5">
                {/* Search Button */}
                <div className="flex">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <button
                    onClick={() => setSearchOpen(true)}
                    className={getNavLinkClasses(
                      "#",
                      "bg-transparent items-center rounded-md text-gray-100 transition hover:text-white outline-none pr-3 py-0",
                    )}
                  >
                    <span className="sr-only">Open search field</span>
                    <Icon name="search" className={iconSize} type="regular" />
                  </button>
                  <SearchModal isOpen={searchOpen} setIsOpen={setSearchOpen} />
                </div>

                <Usernav
                  iconSize={iconSize}
                  mobileMenuOpen={open}
                  userMenuItems={userNavigation}
                  searchOpen={searchOpen}
                  getNavLinkClasses={getNavLinkClasses}
                />

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                  <Popover.Button
                    className={getNavLinkClasses(
                      "#",
                      "bg-transparent rounded-md text-white transition hover:text-white hover:bg-white hover:bg-opacity-10 outline-none py-0",
                    )}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Icon
                      name="bars"
                      className={iconSize + ""}
                      type="regular"
                    />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>

          <MobileMenu
            logo={logo}
            menuItems={menuItems}
            currentPath={router.pathname}
            userMenuItems={userNavigation}
            iconSize={iconSize}
            closeMenu={close}
          />
        </>
      )}
    </Popover>
  )
}

export default Navbar
