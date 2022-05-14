import { HTMLProps } from "react"
import NextLink from "next/link"

const Link = ({
  href,
  title,
  target,
  className,
  children,
  passHref = true,
  ...rest
}: HTMLProps<HTMLAnchorElement> & { passHref?: boolean }) => {
  return (
    <NextLink href={href || ""} passHref>
      <a title={title} target={target} {...rest} className={className}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
