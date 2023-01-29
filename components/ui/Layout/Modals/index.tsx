"use client"

import { MenuItemsType } from "@api/types/menu"
import CartSlider from "./CartSlider"
import LoginModal from "./LoginModal"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"

// ####
// #### Types
// ####

type ModalsInputType = { menuItems: MenuItemsType | null | undefined }

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
