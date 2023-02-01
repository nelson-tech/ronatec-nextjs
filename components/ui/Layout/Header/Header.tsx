"use client"

import useScrollDirection from "@lib/hooks/useScrollDirection"

import Link from "@components/Link"
import Image from "@components/Image"

import Promo from "./Promo"
import MainMenu from "./MainMenu"
import Usernav from "./UserNav"
import MobileNav from "./MobileNav"
import { MenuItem } from "@api/codegen/graphql"

// ####
// #### Types
// ####

type HeaderProps = {
  promo?: boolean
  menuItems: MenuItem[]
}

// ####
// #### Component
// ####

const Header = ({ promo = false, menuItems }: HeaderProps) => {
  const { scrollDirection, atTop } = useScrollDirection()

  const logo = (
    <>
      <div className={`w-10 h-10 text-center text-blue-main relative`}>
        <Image src="/images/ronatec.png" alt="Ronatec Logo" fill sizes="10vw" />
      </div>
    </>
  )

  return (
    <>
      <header
        className={`z-30 sticky ${
          scrollDirection === "down" ? "-top-16" : "top-0"
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
                  <div className="hidden lg:flex lg:items-center h-8 w-8">
                    <Link href="/" className="text-blue-main">
                      <span className="sr-only">Ronatec C2C, Inc.</span>
                      {logo}
                    </Link>
                  </div>

                  <MainMenu menuItems={menuItems} />

                  {/* Mobile menu and search (lg-) */}
                  <MobileNav />

                  {/* Logo (lg-) */}
                  <div className="h-8 w-8 lg:hidden">
                    <Link href="/" className="text-blue-main">
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
