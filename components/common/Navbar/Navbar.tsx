import { Container } from "@components/ui"
import Link from "next/link"
import { FC } from "react"
import tw from "twin.macro"
import { Usernav } from "@components/common"
import s from "./Navbar.module.css"

const Navbar: FC = () => {
  return (
    <Container>
      <div className={s.root}>
        <div css={tw`flex flex-1 items-center`}>
          <Link href="/">
            <a className={s.logo}>HELLO</a>
          </Link>
          <nav css={tw`ml-6 space-x-6`}>
            <Link href="/">
              <a className={s.link}>All</a>
            </Link>
            <Link href="/">
              <a className={s.link}>Clothes</a>
            </Link>
            <Link href="/">
              <a className={s.link}>Accessories</a>
            </Link>
            <Link href="/">
              <a className={s.link}>Shoes</a>
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
