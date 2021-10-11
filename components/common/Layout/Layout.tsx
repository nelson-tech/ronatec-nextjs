import { FC } from "react"
import { css, theme } from "twin.macro"
import Button from "../Button"

const base = css`
  color: black;
  background-color: ${theme`colors.blue.200`};
`

const Layout: FC = ({ children }) => {
  return (
    <div
      css={css`
        ${base};
      `}
    >
      <Button isSmall>Button</Button>
      <main className="fit">{children}</main>
    </div>
  )
}

export default Layout
