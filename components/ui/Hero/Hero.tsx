import { FC } from "react"
import s from "./Hero.module.css"
import Link from "next/link"
import { Container } from "@components/ui"

interface Props {
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Container el={"div" as any}>
        <div className={s.root}>
          <h2 className={s.headline}>{headline}</h2>
          <div style={{ flex: 1, maxWidth: 850 }}>
            <p className={s.description}>{description}</p>
            <Link href="/">
              <a className={s.link}>Read more.</a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
