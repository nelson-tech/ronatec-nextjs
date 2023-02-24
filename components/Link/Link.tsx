import type { HTMLProps } from "react"
import NextLink from "next/link"

// ####
// #### Component
// ####

const Link = ({
  href,
  title,
  target,
  className,
  children,
  onClick,
}: HTMLProps<HTMLAnchorElement>) => {
  return (
    <NextLink
      href={href ?? ""}
      title={title}
      target={target}
      onClick={onClick}
      id="nextlink"
      className={className}
    >
      {children}
    </NextLink>
  )
}

export default Link
