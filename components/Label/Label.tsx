import React from "react"

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className=" text-base tracking-[1px] uppercase md:text-[13px]">
      {children}
    </p>
  )
}

export default Label
