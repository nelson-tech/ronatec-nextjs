import { Container } from "@components/ui"
import Link from "next/link"
import { FC } from "react"
import tw from "twin.macro"
import { Usernav } from "@components/common"
import { rootS, linkS, logoS } from "./Navbar.style"

const Navbar: FC = () => {
  return (
    <Container>
      <div css={rootS()}>
        <div css={tw`flex flex-1 items-center`}>
          <Link href="/">
            <a css={logoS()}>HELLO</a>
          </Link>
          <nav css={tw`ml-6 space-x-6`}>
            <Link href="/">
              <a css={linkS()}>All</a>
            </Link>
            <Link href="/">
              <a css={linkS()}>Clothes</a>
            </Link>
            <Link href="/">
              <a css={linkS()}>Accessories</a>
            </Link>
            <Link href="/">
              <a css={linkS()}>Shoes</a>
            </Link>
          </nav>
          <div css={tw`flex flex-1 justify-end space-x-8`}>
            <Usernav />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Navbar
