"use client"

import { Popover } from "@headlessui/react"
import { usePathname } from "next/navigation"

import Link from "@components/Link"
import MegaMenu from "./MegaMenu"
import Dropdown from "./Dropdown"
import type { MainMenuLink as MainMenuLinkType } from "~payload-types"
import MainMenuLink from "./MainMenuLink"

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
  menuItems: MainMenuLinkType | undefined
}

// ####
// #### Component
// ####

const MainMenu = ({ menuItems }: MainMenuInputType) => {
  const pathname = usePathname()

  return (
    <>
      {menuItems && (
        <div className="hidden h-full lg:flex items-center justify-center w-full">
          {/* Mega menus */}
          <Popover.Group className="ml-8">
            <div className="h-full flex items-center space-x-8 text-sm font-medium text-gray-600">
              {menuItems.map((menuItem) => {
                const { link, id } = menuItem

                if (link.children && link.children.length > 0) {
                  if (link?.megaMenu) {
                    // Mega Menu Column
                    return <MegaMenu megaItem={menuItem} key={id} />
                  } else {
                    return <Dropdown menuItem={menuItem} key={id} />
                  }
                } else {
                  return (
                    link?.label && <MainMenuLink menuItem={menuItem} key={id} />
                  )
                }
              })}
            </div>
          </Popover.Group>
        </div>
      )}
    </>
  )
}

export default MainMenu
