import { FC, ReactNode } from "react"
import { ThemeProvider } from "@emotion/react"

import { emotionTheme } from "styles/theme"
import GlobalStyles from "styles/GlobalStyles"
// import { useUI } from "@components/ui/context"
import { Footer } from "./"
import { LoadingDots } from "@components/ui"
import Header from "./Header"

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
      <GlobalStyles />
      <Header />
      <main className="flex-1 overflow-y-auto px-5 bg-white  max-w-full relative overflow-x-hidden font-family">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
