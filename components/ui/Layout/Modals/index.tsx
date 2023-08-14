"use client"

import CartSlider from "./CartSlider"
import LoginModal from "./LoginModal"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"
import { MobileMenuLink } from "payload/generated-types"

// ####
// #### Types
// ####

type ModalsInputType = { menuItems: MobileMenuLink | undefined }

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
