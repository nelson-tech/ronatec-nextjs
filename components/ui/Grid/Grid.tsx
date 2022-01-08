import { FC, ReactNode } from "react"
import { Container } from "./style"

interface Props {
  children: ReactNode[]
  layout?: "A" | "B"
}

const Grid: FC<Props> = ({ children, layout = "A" }) => {
  return <Container layout={layout}>{children}</Container>
}

export default Grid
