import CollectionIcon from "@heroicons/react/24/outline/InboxStackIcon"

type UserMenuItem = {
  name: string
  href: string
  icon: (
    props: {
      title?: string | undefined
      titleId?: string | undefined
      className?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  ) => JSX.Element
}

const customerMenu: UserMenuItem[] = [
  // { name: "Your Profile", href: "/dashboard" },
  {
    name: "Orders",
    href: "/orders",
    icon: (props) => <CollectionIcon {...props} />,
  },
]

export default customerMenu
