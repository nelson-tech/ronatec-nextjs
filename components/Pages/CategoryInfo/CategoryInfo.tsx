import { htmlParserOptions, parse } from "@lib/utils"

import Container from "./style"

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
      <div className="w-full px-5">
        <Container>{content && parse(content, htmlParserOptions)}</Container>
      </div>
    </>
  )
}

export default CategoryInfo
