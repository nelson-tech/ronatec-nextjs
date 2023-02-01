"use client"

import { MenuItem } from "@api/codegen/graphql"

import CartSlider from "./CartSlider"
import LoginModal from "./LoginModal"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"

// ####
// #### Types
// ####

type ModalsInputType = { menuItems: MenuItem[] }

// ####
// #### Component
// ####

const Modals = ({ menuItems }: ModalsInputType) => {
  return (
    <>
      {menuItems && <MobileMenu menuItems={menuItems} />}
      <SearchModal />
      <LoginModal />
      <CartSlider />
    </>
  )
}

export default Modals
