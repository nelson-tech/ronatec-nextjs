import tw from "twin.macro"
import { Heart } from "@components/icons"
import { Layout } from "@components/common"
import { Container } from "@components/ui"

export default function Wishlist() {
  const isEmpty = true

  return (
    <Container>
      <div css={tw`mt-3 mb-20`}>
        <div css={tw`flex flex-col`} className="group">
          {isEmpty ? (
            <div
              css={tw`flex-1 px-12 py-24 flex flex-col justify-center items-center `}
            >
              <span
                css={tw`border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-text-primary`}
              >
                <Heart css={tw`absolute`} />
              </span>
              <h2 css={tw`pt-6 text-2xl font-bold tracking-wide text-center`}>
                Your wishlist is empty
              </h2>
              <p css={tw`text-accents-6 px-10 text-center pt-2`}>
                Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
              </p>
            </div>
          ) : (
            <h1>Wishlist cards...</h1>
          )}
        </div>
      </div>
    </Container>
  )
}

Wishlist.Layout = Layout
