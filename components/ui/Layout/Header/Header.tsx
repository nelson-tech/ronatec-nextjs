import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { gql, useQuery } from "@apollo/client"
import Headroom from "react-headroom"
import { Popover } from "@headlessui/react"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline"

import { useAuth, useMainMenu } from "@lib/hooks"
import { Cart } from "@api/gql/types"
import { cartBaseFragment } from "@api/queries/fragments/products"

import { Icon, MenuLink, Modal } from "@components/ui"
import { SearchForm, SignIn, Image } from "@components"
import Promo from "./Promo"
import MobileMenu from "./MobileMenu"
import Usernav from "./Usernav"
import MegaMenu from "./MegaMenu"
import Dropdown from "./Dropdown"
import CartSlider from "./CartSlider"

const getCartQuery = gql`
  query CartQuery {
    cart {
      ${cartBaseFragment}
    }
  }
`

type DesktopLinkStyleProps = {
  open: boolean
  path: string
}

export type GetDesktopLinkStyleType = ({
  open,
  path,
}: DesktopLinkStyleProps) => string

type HeaderProps = {
  promo?: boolean
}

const Header = ({ promo = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [signInOpen, setSignInOpen] = useState<boolean>(false)
  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)

  const router = useRouter()

  const { menu } = useMainMenu()

  const [cart, setCart] = useState<Cart | null>()

  const { data, error, loading } = useQuery(getCartQuery)

  const { logout } = useAuth()

  useEffect(() => {
    if (error && error.message === "Internal server error") {
      logout()
    }
  }, [error, logout])

  useEffect(() => {
    data && setCart(data.cart)
  }, [data])

  const getDesktopLinkStyle: GetDesktopLinkStyleType = ({
    open,
    path,
  }): string => {
    const current =
      router.pathname.slice(0, path.length) === path && path !== "/"
    return `transition-colors ease-out duration-200 py-2 px-3 rounded-md outline-none ${
      open || current ? "bg-gray-100" : "hover:bg-gray-100"
    } text-gray-900 font-medium inline-flex items-center`
  }

  const logo = (
    <Fragment>
      <Icon name="globe-americas" type="regular" />
      {/* <div className="w-32">
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_BASE_URL}/ronatec/ronatec-logo.svg`}
          height={201}
          width={780}
          layout="responsive"
          objectFit="cover"
        />
      </div> */}
    </Fragment>
  )

  return (
    <>
      <MobileMenu
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        menu={menu}
      />

      <Modal open={signInOpen} setOpen={setSignInOpen}>
        <SignIn />
      </Modal>

      <Modal open={searchOpen} setOpen={setSearchOpen}>
        <SearchForm />
      </Modal>

      <CartSlider open={cartOpen} setOpen={setCartOpen} cart={cart} />
      <header>
        <Headroom
          style={{ zIndex: 11 }}
          upTolerance={2}
          className={`font-family h-26`}
        >
          <nav aria-label="Top" className="border-b bg-white border-gray-200">
            {/* Top navigation */}
            {promo && <Promo />}

            {/* Secondary navigation */}
            <div className="bg-white mx-auto lg:max-w-7xl">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="">
                  <div className="h-16 flex items-center justify-between">
                    {/* Logo (lg+) */}
                    {/* <div className="hidden lg:flex lg:items-center">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                          alt=""
                        />
                      </a>
                    </div> */}
                    <div className="hidden lg:flex lg:items-center h-8 w-8">
                      <Link href="/">
                        <a className="text-blue-main">
                          <span className="sr-only">Ronatec C2C, Inc.</span>
                          {logo}
                        </a>
                      </Link>
                    </div>

                    <div className="hidden h-full lg:flex items-center">
                      {/* Mega menus */}
                      <Popover.Group className="ml-8">
                        <div className="h-full flex items-center space-x-2 text-sm font-medium text-gray-600">
                          {menu.map(menuItem => {
                            if (menuItem.children) {
                              if (menuItem.mega) {
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
                              const path = menuItem.path || "/"
                              return (
                                <div
                                  key={menuItem.label}
                                  className="relative flex"
                                >
                                  <MenuLink
                                    href={path}
                                    className={getDesktopLinkStyle({
                                      open: false,
                                      path,
                                    })}
                                  >
                                    {menuItem.label}
                                  </MenuLink>
                                </div>
                              )
                            }
                          })}
                        </div>
                      </Popover.Group>
                    </div>

                    {/* Mobile menu and search (lg-) */}
                    <div className="flex-1 flex items-center lg:hidden">
                      <button
                        type="button"
                        className="-ml-2 bg-white p-2 rounded-md text-gray-400 focus:text-white"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span className="sr-only focus:text-white">
                          Open menu
                        </span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Search */}
                      <div
                        className="ml-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                        onClick={() => setSearchOpen(true)}
                      >
                        <span className="sr-only">Search</span>
                        <SearchIcon className="w-6 h-6" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Logo (lg-) */}
                    <div className="h-8 w-8 lg:hidden">
                      <Link href="/">
                        <a className="text-blue-main">
                          <span className="sr-only">Ronatec C2C, Inc.</span>
                          {logo}
                        </a>
                      </Link>
                    </div>

                    <div className="flex-1 flex items-center justify-end">
                      <div className="flex items-center lg:ml-8">
                        <div className="flex space-x-8 items-center">
                          <div
                            onClick={() => setSearchOpen(true)}
                            className="hidden lg:flex -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">Search</span>
                            <SearchIcon
                              className="w-6 h-6"
                              aria-hidden="true"
                            />
                          </div>

                          <div className="flex align-middle justify-center">
                            <span className="sr-only">Account</span>
                            <Usernav
                              iconSize="h-6 w-6"
                              setSignInOpen={setSignInOpen}
                              mobileMenuOpen={mobileMenuOpen}
                            />
                          </div>
                        </div>

                        <span
                          className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                          aria-hidden="true"
                        />

                        <div className="flow-root">
                          <button
                            type="button"
                            className="group -m-2 p-2 flex items-center"
                            onClick={() => setCartOpen(true)}
                          >
                            <ShoppingCartIcon
                              className={`flex-shrink-0 h-6 w-6 text-gray-400${
                                cart && cart.contents?.itemCount
                                  ? " group-hover:text-gray-500"
                                  : ""
                              }`}
                              aria-hidden="true"
                            />
                            <span
                              className={`ml-2 text-sm font-medium text-gray-400${
                                cart && cart.contents?.itemCount
                                  ? " group-hover:text-gray-600"
                                  : ""
                              }`}
                            >
                              {cart && cart.contents?.itemCount}
                            </span>
                            <span className="sr-only">
                              items in cart, view bag
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
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
