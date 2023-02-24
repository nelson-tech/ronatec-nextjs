import { ProductCategory } from "@api/codegen/graphql"

import Link from "@components/Link"
import Image from "@components/Image"

type CategoryLinkPropsType = {
  category: ProductCategory
}

const CategoryLink = ({ category }: CategoryLinkPropsType) => {
  return (
    <div
      key={category?.id}
      className="m-4 hover:bg-gray-50 hover:shadow transition-all hover:rounded overflow-hidden"
    >
      <Link href={`/products/${category?.slug}`} title={category?.name ?? ""}>
        <div className="">
          {category.image && category.image?.sourceUrl && (
            <div className="relative w-full mx-auto h-32 pt-2">
              <Image
                src={category.image?.sourceUrl}
                alt={category?.name ?? ""}
                fill
                sizes="25vw"
                className="object-cover rounded"
              />
            </div>
          )}
          <div className="text-center align-bottom py-2 hover:text-gray-900">
            {category?.name}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CategoryLink
