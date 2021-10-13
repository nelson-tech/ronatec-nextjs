import { ComponentType, FC, HTMLAttributes, ReactNode } from "react"
import s from "./Container.module.css"

interface Props {
  children: ReactNode | ReactNode[]
  el?: ComponentType<HTMLAttributes<HTMLElement>>
}

const Container: FC<Props> = ({ children, el: Element = "div" }) => {
  return <Element className={s.root}>{children}</Element>
}

export default Container
