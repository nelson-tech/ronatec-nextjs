import { useRouter } from "next/dist/client/router"
import Image from "next/image"

import MenuLink from "@components/ui/MenuLink"

type CarouselCardPropsType = {
  name: string
  slug: string
  image?: {
    sourceUrl?: string
    altText?: string
  }
}

const CarouselCard = ({ name, slug, image }: CarouselCardPropsType) => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.push(path)
  }

  return (
    <div
      key={name}
      onClick={() => handleClick(`/products/${slug}`)}
      title={name || ""}
      className="group relative w-56 h-72 rounded-lg cursor-pointer p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
    >
      <div aria-hidden="true" className="absolute inset-0 w-56 h-72">
        {image && image.sourceUrl && (
          <div className="w-56 h-72 relative">
            <Image
              src={image?.sourceUrl || ""}
              alt={image?.altText || ""}
              title={name || ""}
              objectFit="cover"
              layout="fill"
            />
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-90"
      />
      <MenuLink
        href={`/products/${slug}`}
        title={name || ""}
        className="relative mt-auto text-center text-xl font-bold text-white"
      >
        {name}
      </MenuLink>
    </div>
  )
}

export default CarouselCard
