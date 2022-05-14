import CartSlider from "./CartSlider"
import CartWarningModal from "./CartWarningModal"
import LoginModal from "./LoginModal"
import MobileMenu from "./MobileMenu"
import SearchModal from "./SearchModal"

const Modals = () => {
  return (
    <>
      <MobileMenu />
      <SearchModal />
      <LoginModal />
      <CartSlider />
      <CartWarningModal />
    </>
  )
}

export default Modals
