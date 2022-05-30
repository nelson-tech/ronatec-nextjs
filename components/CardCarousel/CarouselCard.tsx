import { memo } from "react"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"

import { MediaItem } from "@api/gql/types"

import Link from "@components/Link"

// ####
// #### Types
// ####

export type PropsType = {
  name: string
  slug: string
  image?: MediaItem | undefined
  index: number
}

// ####
// #### Component
// ####

const CarouselCard = memo(({ name, slug, image, index }: PropsType) => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <div
      onClick={() => handleClick(`/products/${slug}`)}
      title={name}
      data-testid="carousel-card"
      className="group relative w-56 h-72 rounded-lg cursor-pointer p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
    >
      <div aria-hidden="true" className="absolute inset-0 w-56 h-72">
        {image && image.sourceUrl && (
          <div className="w-56 h-72 relative">
            <Image
              src={image.sourceUrl}
              alt={image.altText || ""}
              title={name}
              objectFit="cover"
              layout="fill"
              priority={index < 2}
              sizes="50vw"
            />
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-90"
      />
      <Link
        href={`/products/${slug}`}
        title={name || ""}
        className="relative mt-auto text-center text-xl font-bold text-white"
      >
        {name}
      </Link>
    </div>
  )
})

CarouselCard.displayName = "CarouselCard"

export default CarouselCard
