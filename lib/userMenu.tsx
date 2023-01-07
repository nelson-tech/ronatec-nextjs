import CollectionIcon from "@heroicons/react/24/outline/InboxStackIcon"

type UserMenuItem = {
  name: string
  href: string
  icon: (props: React.ComponentProps<"svg">) => JSX.Element
}

const userMenu: UserMenuItem[] = [
  // { name: "Your Profile", href: "/dashboard" },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: props => <CollectionIcon {...props} />,
  },
]

export default userMenu
