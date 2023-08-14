import Link from "@components/Link"
import { Menu, Popover } from "@headlessui/react"
import { usePathname } from "next/navigation"
import {
  MainMenuLink as MainMenuLinkType,
  NavLink,
} from "payload/generated-types"

type PropsType = {
  menuItem: MainMenuLinkType[0]
  open?: boolean
  children?: React.ReactNode
  button?: boolean
  mega?: boolean
}

const MainMenuLink = ({
  menuItem,
  open = false,
  button = false,
  mega = false,
  children,
}: PropsType) => {
  const { id, link } = menuItem

  const path = usePathname()

  const linkUrl =
    link.type === "reference" && typeof link.reference?.value === "object"
      ? link.reference?.value.slug ?? "/"
      : link?.url ?? "/"

  const Wrapper = button ? Menu.Button : mega ? Popover.Button : Link

  const current = linkUrl !== "/" && linkUrl !== "#" && linkUrl === path

  return (
    <div className="relative flex">
      <Wrapper
        href={linkUrl}
        title={link.label}
        className={`transition-colors ease-out duration-200 py-2 px-3 rounded outline-none ${
          open || current ? "bg-gray-100" : "hover:bg-gray-100"
        } text-gray-900 font-medium inline-flex items-center`}
      >
        {link.label}
        {children}
      </Wrapper>
    </div>
  )
}

export default MainMenuLink
