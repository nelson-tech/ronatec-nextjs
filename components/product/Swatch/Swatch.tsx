import { Check } from "@components/icons"
import { ButtonHTMLAttributes, FC } from "react"
import cn from "classnames"
import { isDark } from "@lib/colors"
import s from "./Swatch.module.css"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  label?: string
  variant: "size" | "color" | string
  active: boolean
}

const Swatch: FC<Props> = ({ color, label, variant, active, ...rest }) => {
  label = label?.toLowerCase()
  variant = variant?.toLowerCase()

  const rootClassNames = cn(s.root, {
    [s.active]: active,
    [s.color]: color,
    [s.size]: variant === "size",
    [s.dark]: color && isDark(color),
  })

  return (
    <button
      className={rootClassNames}
      style={color ? { backgroundColor: color } : {}}
      {...rest}
    >
      {variant === "color" && active && (
        <span>
          <Check />
        </span>
      )}
      {variant === "size" ? label : null}
    </button>
  )
}

export default Swatch
