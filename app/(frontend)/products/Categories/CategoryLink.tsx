import type { Category } from "payload/generated-types"

import Image from "@components/Image"
import Link from "@components/Link"

type CategoryLinkPropsType = {
  category: Category
}

const CategoryLink = ({ category }: CategoryLinkPropsType) => {
  return (
    <div
      key={category?.id}
      className="m-4 hover:bg-gray-50 hover:shadow group transition-all hover:rounded overflow-hidden"
    >
      <Link
        href={`/products/${category?.slug}`}
        title={category?.title ?? ""}
        className="relative"
      >
        <div className="h-full">
          <div className="relative w-full mx-auto h-32 pt-2">
            {typeof category?.image === "object" && category.image.url ? (
              <Image
                src={category.image.url}
                alt={category.image.alt ?? ""}
                sizes="25vw"
                className="object-cover rounded"
              />
            ) : (
              category.wc?.image?.src && (
                <Image
                  src={category.wc.image.src}
                  alt={category.wc.image.alt ?? ""}
                  width={200}
                  height={128}
                  className="object-contain w-full aspect-video rounded overflow-hidden"
                />
              )
            )}
          </div>
          <div
            className="text-center align-bottom py-2 group-hover:text-gray-900"
            dangerouslySetInnerHTML={{ __html: category?.title ?? "" }}
          ></div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryLink
