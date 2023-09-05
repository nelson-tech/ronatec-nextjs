"use client"

import { memo } from "react"
import { useRouter } from "next/navigation"
import Image from "@components/Image"

import Link from "@components/Link"
import { Category, Image as ImageType } from "~payload-types"

// ####
// #### Types
// ####

export type PropsType = {
  name: string
  slug: string
  image?: ImageType | undefined
  index: number
  wcImage?: Exclude<Category["wc"], undefined>["image"]
}

// ####
// #### Component
// ####

const CarouselCard = memo(({ name, slug, image, wcImage }: PropsType) => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <div
      onClick={() => handleClick(`/products/${slug}`)}
      title={name}
      data-testid="carousel-card"
      className="group relative w-56 h-72 rounded cursor-pointer p-6 flex flex-col overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 w-56 h-72">
        {image?.url ? (
          <div className="w-56 h-72 relative">
            <Image
              src={image.url}
              alt={image.alt ?? ""}
              fill
              title={name}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          wcImage?.src && (
            <div className="w-56 h-72 relative">
              <Image
                src={wcImage.src}
                alt={wcImage.alt ?? ""}
                fill
                title={name}
                className="object-cover w-full h-full"
              />
            </div>
          )
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 group-hover:from-accent transition-all opacity-90"
      />
      <Link
        href={`/products/${slug}`}
        title={name ?? ""}
        className="relative mt-auto text-center text-xl font-bold text-white"
      >
        <span dangerouslySetInnerHTML={{ __html: name }} />
      </Link>
    </div>
  )
})

CarouselCard.displayName = "CarouselCard"

export default CarouselCard
