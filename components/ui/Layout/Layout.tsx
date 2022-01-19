import { FC, ReactNode } from "react"
import { ThemeProvider } from "@emotion/react"

import { emotionTheme } from "styles/theme"
import GlobalStyles from "styles/GlobalStyles"
import { Header, Footer } from "./"
import { Alerts, LoadingDots } from "@components/ui"

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
      <Header />
      <main className="flex-1 overflow-y-auto px-5 bg-white  max-w-full relative overflow-x-hidden font-family">
        {children}
      </main>
      <Footer />
      <Alerts />
    </ThemeProvider>
  )
}

export default Layout
