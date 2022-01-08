import { FC, ReactNode } from "react"
import { Container, StyledContent } from "./style"

interface Props {
  children: ReactNode | ReactNode[]
}

const Marquee: FC<Props> = ({ children }) => {
  return (
    <Container>
      <StyledContent>{children}</StyledContent>
    </Container>
  )
}

export default Marquee
