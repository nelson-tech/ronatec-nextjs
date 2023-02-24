"use client"

import { Popover } from "@headlessui/react"
import { usePathname } from "next/navigation"

import { MenuItem } from "@api/codegen/graphql"

import Link from "@components/Link"
import MegaMenu from "./MegaMenu"
import Dropdown from "./Dropdown"

// ####
// #### Types
// ####

type DesktopLinkStyleProps = {
  open: boolean
  path: string
}

export type GetDesktopLinkStyleType = ({
  open,
  path,
}: DesktopLinkStyleProps) => string

type MainMenuInputType = {
  menuItems: MenuItem[]
}

// ####
// #### Component
// ####

const MainMenu = ({ menuItems }: MainMenuInputType) => {
  const pathname = usePathname()

  const getDesktopLinkStyle: GetDesktopLinkStyleType = ({
    open,
    path,
  }): string => {
    const current = pathname?.slice(0, path.length) === path && path !== "/"
    return `transition-colors ease-out duration-200 py-2 px-3 rounded outline-none ${
      open || current ? "bg-gray-100" : "hover:bg-gray-100"
    } text-gray-900 font-medium inline-flex items-center`
  }
  return (
    <>
      <div className="hidden h-full lg:flex items-center">
        {/* Mega menus */}
        <Popover.Group className="ml-8">
          <div className="h-full flex items-center space-x-2 text-sm font-medium text-gray-600">
            {menuItems.map((menuItem: MenuItem) => {
              if (
                menuItem.childItems?.nodes &&
                menuItem.childItems.nodes.length > 0
              ) {
                if (menuItem.menuFields?.mega) {
                  // Mega Menu Column
                  return (
                    <MegaMenu
                      megaItem={menuItem}
                      getStyle={getDesktopLinkStyle}
                      key={menuItem.id}
                    />
                  )
                } else {
                  return (
                    <Dropdown
                      menuItem={menuItem}
                      getStyle={getDesktopLinkStyle}
                      key={menuItem.id}
                    />
                  )
                }
              } else {
                const path = menuItem.url || "/"
                return (
                  menuItem.label && (
                    <div key={menuItem.label} className="relative flex">
                      <Link
                        href={path}
                        title={menuItem.label}
                        className={getDesktopLinkStyle({
                          open: false,
                          path,
                        })}
                      >
                        {menuItem.label}
                      </Link>
                    </div>
                  )
                )
              }
            })}
          </div>
        </Popover.Group>
      </div>
    </>
  )
}

export default MainMenu
