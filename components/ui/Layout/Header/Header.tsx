import Headroom from "react-headroom"

import Link from "@components/Link"

import Promo from "./Promo"
import MainMenu from "./MainMenu"
import Usernav from "./UserNav"
import MobileNav from "./MobileNav"
import Image from "@components/Image"

// ####
// #### Types
// ####

type HeaderProps = {
  promo?: boolean
}

// ####
// #### Component
// ####

const Header = ({ promo = false }: HeaderProps) => {
  const logo = (
    <>
      <div className={`w-10 h-10 text-center text-blue-main`}>
        <Image
          src="/images/ronatec.png"
          alt="Ronatec Logo"
          layout="responsive"
        />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path
            fill="#5375A0"
            d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm-32 50.8v11.3c0 11.9-12.5 19.6-23.2 14.3l-24-12c14.9-6.4 30.7-10.9 47.2-13.6zm32 369.8V456c-110.3 0-200-89.7-200-200 0-29.1 6.4-56.7 17.6-81.7 9.9 14.7 25.2 37.4 34.6 51.1 5.2 7.6 11.2 14.6 18.1 20.7l.8.7c9.5 8.6 20.2 16 31.6 21.8 14 7 34.4 18.2 48.8 26.1 10.2 5.6 16.5 16.3 16.5 28v32c0 8.5 3.4 16.6 9.4 22.6 15 15.1 24.3 38.7 22.6 51.3zm42.7 22.7l17.4-46.9c2-5.5 3.3-11.2 4.8-16.9 1.1-4 3.2-7.7 6.2-10.7l11.3-11.3c8.8-8.7 13.7-20.6 13.7-33 0-8.1-3.2-15.9-8.9-21.6l-13.7-13.7c-6-6-14.1-9.4-22.6-9.4H232c-9.4-4.7-21.5-32-32-32s-20.9-2.5-30.3-7.2l-11.1-5.5c-4-2-6.6-6.2-6.6-10.7 0-5.1 3.3-9.7 8.2-11.3l31.2-10.4c5.4-1.8 11.3-.6 15.5 3.1l9.3 8.1c1.5 1.3 3.3 2 5.2 2h5.6c6 0 9.8-6.3 7.2-11.6l-15.6-31.2c-1.6-3.1-.9-6.9 1.6-9.3l9.9-9.6c1.5-1.5 3.5-2.3 5.6-2.3h9c2.1 0 4.2-.8 5.7-2.3l8-8c3.1-3.1 3.1-8.2 0-11.3l-4.7-4.7c-3.1-3.1-3.1-8.2 0-11.3L264 112l4.7-4.7c6.2-6.2 6.2-16.4 0-22.6l-28.3-28.3c2.5-.1 5-.4 7.6-.4 78.2 0 145.8 45.2 178.7 110.7l-13 6.5c-3.7 1.9-6.9 4.7-9.2 8.1l-19.6 29.4c-5.4 8.1-5.4 18.6 0 26.6l18 27c3.3 5 8.4 8.5 14.1 10l29.2 7.3c-10.8 84-73.9 151.9-155.5 169.7z"
          />
        </svg> */}
      </div>
      {/* <div className="w-32">
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/ronatec/ronatec-logo.svg`}
          height={201}
          width={780}
          layout="responsive"
          objectFit="cover"
        />
      </div> */}
    </>
  )

  return (
    <>
      <header>
        <Headroom style={{ zIndex: 11 }} upTolerance={2} className={` h-26`}>
          <nav aria-label="Top" className="border-b bg-white border-gray-200">
            {/* Top navigation */}
            {promo && <Promo />}

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

                    <MainMenu />

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
        </Headroom>
      </header>
    </>
  )
}

export default Header
