import { FC, ReactNode } from "react"
import dynamic from "next/dynamic"
import { ThemeProvider } from "@emotion/react"

import { emotionTheme } from "styles/theme"
// import GlobalStyles from "styles/GlobalStyles"
// import { Header, Footer } from "./"
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
      <main className="flex-1 overflow-y-auto bg-white  max-w-full relative overflow-x-hidden font-family min-h-screen">
        {children}
      </main>
      <Footer />
      <Alerts />
    </ThemeProvider>
  )
}

export default Layout
