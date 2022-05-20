import { FC, ReactNode } from "react"
import dynamic from "next/dist/shared/lib/dynamic"
import { ThemeProvider } from "@emotion/react"

import GlobalStyles from "@styles/emotion-global"
import { emotionTheme } from "@styles/emotion-theme"

import Header from "./Header"
import Tracking from "./Tracking"

// ####
// #### Dynamic Imports
// ####

const clientOpts = { ssr: false }

const Alerts = dynamic(() => import("@components/ui/Alerts"), clientOpts)
const Modals = dynamic(() => import("./Modals"), clientOpts)
const ScrollArrow = dynamic(
  () => import("@components/ui/ScrollArrow"),
  clientOpts,
)
const Logic = dynamic(() => import("./Logic"), clientOpts)
const Footer = dynamic(() => import("@components/ui/Layout/Footer"), clientOpts)

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
      <Header promo />
      <main className="overflow-y-auto bg-white max-w-full relative overflow-x-hidden min-h-screen">
        {children}
      </main>
      <Footer />

      <Logic />
      <Modals />
      <ScrollArrow />
      <Alerts />
      <Tracking />
    </ThemeProvider>
  )
}

export default Layout
