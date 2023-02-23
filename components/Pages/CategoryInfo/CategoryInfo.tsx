"use client"

import { htmlParserOptions, parse } from "@lib/utils"

// import Container from "./style"

// ####
// #### Types
// ####

type PropsType = {
  content: string | null | undefined
}

// ####
// #### Component
// ####

const CategoryInfo = ({ content }: PropsType) => {
  return (
    <>
      <div className="pt-4 p-4"></div>
      <div className="w-full px-5">
        <div className="category-info pt-8 px-2 mb-8 text-gray-700 mx-auto lg:max-w-7xl">
          {content && parse(content, htmlParserOptions)}
        </div>
      </div>
    </>
  )
}

export default CategoryInfo
