import { FC, ReactNode } from "react"
import s from "./Marquee.module.css"

interface Props {
  children: ReactNode | ReactNode[]
}

const Marquee: FC<Props> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default Marquee
