import { HTMLProps } from "react"
import Link from "next/link"

const MenuLink = (props: HTMLProps<HTMLAnchorElement>) => {
  let { href, title, target, className, children, ...rest } = props
  return (
    <Link href={href || ""} passHref>
      <a title={title} target={target} {...rest} className={className}>
        {children}
      </a>
    </Link>
  )
}

export default MenuLink
