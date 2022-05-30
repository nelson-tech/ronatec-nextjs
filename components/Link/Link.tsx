import { HTMLProps } from "react"
import NextLink from "next/link"

// ####
// #### Types
// ####

export type PropsType = HTMLProps<HTMLAnchorElement> & { passHref?: boolean }

// ####
// #### Component
// ####

const Link = ({
  href,
  title,
  target,
  className,
  children,
  passHref = true,
  ...rest
}: PropsType) => {
  return (
    <NextLink href={href || ""} passHref id="nextlink">
      <a title={title} target={target} {...rest} className={className}>
        {children}
      </a>
    </NextLink>
  )
}

export default Link
