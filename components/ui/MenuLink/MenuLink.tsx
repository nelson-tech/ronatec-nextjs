import { DetailsHTMLAttributes, FC, HTMLAttributes, HTMLProps } from "react"
import Link from "next/link"

const MyLink = (props: HTMLProps<HTMLAnchorElement>) => {
  let { href, title, target, className, children, ...rest } = props
  return (
    <Link href={href || ""} passHref>
      <a title={title} target={target} {...rest} className={className}>
        {children}
      </a>
    </Link>
  )
}

export default MyLink
