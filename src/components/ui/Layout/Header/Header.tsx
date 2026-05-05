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
    <div className="relative h-[98px] w-[245px]">
      <Image
        src="/logo.svg"
        alt="Ronatec Logo"
        fill
        sizes="10vw"
        className="object-contain"
      />
    </div>
  )

  return (
    <>
      <header
        className={`z-30 sticky ${
          scrollDirection === "down" ? "-top-[118px]" : "top-0"
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
                <div className="h-[118px] flex items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link href="https://ronatec.us" className="text-accent">
                      <span className="sr-only">Ronatec C2C, Inc.</span>
                      {logo}
                    </Link>
                  </div>

                  <MainMenu menuItems={menus.mainMenu.links} />

                  {/* Mobile menu and search (lg-) */}
                  <MobileNav />

                  {/* Logo (lg-) */}
                  <div className="lg:hidden">
                    <Link href="https://ronatec.us" className="text-accent">
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
