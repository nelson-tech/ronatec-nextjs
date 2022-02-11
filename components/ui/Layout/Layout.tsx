import { FC, ReactNode } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { ThemeProvider } from "@emotion/react"

import { emotionTheme } from "styles/theme"
// import GlobalStyles from "styles/GlobalStyles"
// import Header from "@components/ui/Layout/Header"
// import Footer from "@components/ui/Layout/Footer"
// import Alerts from "@components/ui/Alerts"
// import ScrollArrow from "@components/ui/ScrollArrow"
// import { Alerts, LoadingDots, ScrollArrow } from "@components/ui"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

const Alerts = dynamic(() => import("@components/ui/Alerts"), importOpts)
const Header = dynamic(() => import("@components/ui/Layout/Header"), importOpts)
const Footer = dynamic(() => import("@components/ui/Layout/Footer"), importOpts)
const GlobalStyles = dynamic(() => import("styles/GlobalStyles"), importOpts)
const ScrollArrow = dynamic(
  () => import("@components/ui/ScrollArrow"),
  importOpts,
)

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
  return (
    <ThemeProvider theme={emotionTheme}>
      <GlobalStyles />
      <ScrollArrow />
      <Header promo />
      <main className="overflow-y-auto bg-white max-w-full relative overflow-x-hidden font-family min-h-screen">
        {children}
      </main>
      <Footer />
      <Alerts />
    </ThemeProvider>
  )
}

export default Layout
