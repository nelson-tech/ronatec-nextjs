import IconComponent, { IconProps } from "./Component"

const ShoppingCartIcon = (props: IconProps) => {
  const type = props.type ?? "outline"
  return (
    <IconComponent {...props}>
      {type === "outline" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          stroke="none"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0 2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6 0v2z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          stroke="none"
          fill="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 1a5 5 0 0 1 5 5v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3V6a5 5 0 0 1 5-5zm5 10h-2v1a1 1 0 0 0 1.993.117L17 12v-1zm-8 0H7v1a1 1 0 0 0 1.993.117L9 12v-1zm3-8a3 3 0 0 0-2.995 2.824L9 6v2h6V6a3 3 0 0 0-2.824-2.995L12 3z" />
        </svg>
      )}
    </IconComponent>
  )
}

export default ShoppingCartIcon
