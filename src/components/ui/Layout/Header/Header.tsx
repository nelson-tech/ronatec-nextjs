"use client"

import Image from "next/image"

import useScrollDirection from "@hooks/useScrollDirection"

import Link from "@components/Link"

import Promo from "./Promo"
import MainMenu from "./MainMenu"
import Usernav from "./UserNav"
import MobileNav from "./MobileNav"
import { Menu } from "~payload-types"

// ####
// #### Types
// ####

type HeaderProps = {
  promo?: boolean
  menus: Menu
}

// ####
// #### Component
// ####

const Header = ({ promo = false, menus }: HeaderProps) => {
  const { scrollDirection, atTop } = useScrollDirection()

  const logo = (
    <>
      <div className={`w-10 h-10 text-center text-accent relative`}>
        <Image src="/images/ronatec.svg" alt="Ronatec Logo" fill sizes="10vw" />
      </div>
    </>
  )

  return (
    <>
      <header
        className={`z-30 sticky ${
          scrollDirection === "down" ? "-top-20" : "top-0"
        } transition-all duration-500`}
      >
        <nav aria-label="Top" className="border-b bg-white border-gray-200">
          {/* Top navigation */}
          {promo && (
            <Promo
              className={`${
                atTop ? "h-10" : "h-0"
              } transition-all duration-500`}
            />
          )}

          {/* Secondary navigation */}
          <div className="bg-white mx-auto lg:max-w-7xl">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="">
                <div className="h-16 flex items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link href="/" className="text-accent">
                      <span className="sr-only">Ronatec C2C, Inc.</span>
                      {logo}
                    </Link>
                  </div>

                  <MainMenu menuItems={menus.mainMenu.links} />

                  {/* Mobile menu and search (lg-) */}
                  <MobileNav />

                  {/* Logo (lg-) */}
                  <div className="h-8 w-8 lg:hidden">
                    <Link href="/" className="text-accent">
                      <span className="sr-only">Ronatec C2C, Inc.</span>
                      {logo}
                    </Link>
                  </div>

                  <Usernav />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
