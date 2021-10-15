import { css } from "@emotion/react"
import tw from "twin.macro"

export const Footer = () => {
  return (
    <footer css={tw`bg-black pt-1`}>
      <div css={tw`container mx-auto px-6`}>
        <div css={tw`mt-5 flex flex-col items-center`}>
          <div css={tw`py-6`}>
            <p css={tw`mb-6 text-sm text-primary-2 font-bold`}>
              © {new Date().getFullYear()} Ronatec C2C, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
