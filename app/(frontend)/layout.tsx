import "@styles/tailwind.css"

import getLayoutData from "./layout.load"

import ScrollToTop from "@components/ui/ScrollToTop"
// import Analytics from "@components/Analytics"
import Header from "@components/ui/Layout/Header"
import Footer from "@components/ui/Layout/Footer"
import Modals from "@components/ui/Layout/Modals"
import Alerts from "@components/ui/Alerts"

import RootClientContext from "./RootClientContext"

// ####
// #### Variables
// ####

// ####
// #### Component
// ####

const FrontendLayout = async ({ children }: { children: React.ReactNode }) => {
  const { menus, settings, user, promo, cart } = await getLayoutData()
  return (
    <RootClientContext user={user} cart={cart}>
      <div id="top" />
      {menus && <Header menus={menus} promo />}
      <div className="min-h-screen bg-white z-0">{children}</div>
      <Footer />
      <Modals menuItems={menus?.mobileMenu.links} />

      <Alerts />
      <ScrollToTop />
      {/* <Analytics /> */}
    </RootClientContext>
  )
}

export default FrontendLayout
