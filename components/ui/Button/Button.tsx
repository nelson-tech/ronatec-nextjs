import { ButtonHTMLAttributes, FC, ReactNode } from "react"
import cn from "classnames"
import s from "./Button.module.css"
import { LoadingDots } from "@components/ui"
import tw from "twin.macro"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[]
  isLoading?: boolean
}

const Button: FC<Props> = ({
  children,
  className,
  isLoading = false,
  disabled,
  ...rest
}) => {
  const rootClassName = cn(s.root, className, { [s.loading]: isLoading })
  console.log("DISABLED", isLoading || disabled)
  // TODO - Disable hover and pointer stylings when button is disabled
  return (
    <button
      className={rootClassName}
      type="button"
      {...rest}
      disabled={isLoading || disabled}
    >
      {children}
      {isLoading && (
        <i css={tw`pl-2 m-0 flex`}>
          <LoadingDots />
        </i>
      )}
    </button>
  )
}

export default Button
