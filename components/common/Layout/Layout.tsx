import { Sidebar } from "@components/ui"
import { FC } from "react"
import { Footer, Navbar } from ".."
import Button from "../Button"
import { CartSidebar } from "@components/cart"
import { css, useTheme } from "@emotion/react"
import { useUI } from "@components/ui/context"
import { APIProvider } from "@ecommerce"

const Layout: FC = ({ children }) => {
  const t = useTheme()

  const { isSidebarOpen, closeSidebar } = useUI()

  return (
    <APIProvider>
      <div
        css={css`
          --tw-bg-opacity: 1;
          background-color: ${t.colors.primary};
          height: 100%;
          margin-left: auto;
          margin-right: auto;
        `}
      >
        {/* <Button isSmall>Button</Button> */}
        <Navbar />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </APIProvider>
  )
}

export default Layout
