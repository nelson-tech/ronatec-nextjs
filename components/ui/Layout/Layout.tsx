import { FC, ReactNode, useState } from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@emotion/react"

import { emotionTheme } from "styles/theme"
import GlobalStyles from "styles/GlobalStyles"
// import { Sidebar } from "@components/ui"
// import { CartSidebar } from "@components/cart"
// import { useUI } from "@components/ui/context"
// import { Footer, Navbar } from "./"
import { LoadingDots } from "@components/ui"
import Header from "./Header"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Footer = dynamic(() => import("@components/ui/Layout/Footer"), importOpts)
const Navbar = dynamic(() => import("@components/ui/Layout/Navbar"), importOpts)

// ####
// #### Types
// ####

interface Props {
  children: ReactNode | ReactNode[]
}

// ####
// #### Component
// ####

const Layout: FC<Props> = ({ children }) => {
  // const { isSidebarOpen, closeSidebar } = useUI()

  return (
    <ThemeProvider theme={emotionTheme}>
      {/* <Global styles={customStyles} /> */}
      <GlobalStyles />
      <div className="font-family flex flex-col h-screen">
        <div className="header-section">
          <Header />
          {/* <Navbar /> */}
        </div>
        {/* <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
          <CartSidebar />
        </Sidebar> */}
        <div className="main min-h-screen">
          <main className="flex-1 overflow-y-auto px-5 bg-white  max-w-full relative overflow-x-hidden">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Layout
