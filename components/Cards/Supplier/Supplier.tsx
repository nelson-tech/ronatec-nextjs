import Image from "next/image"
import { Icon } from "@components/ui"
import { Underlined, underSelect } from "styles/utils"
import { Supplier } from "@api/gql/types"

export type FeaturedSupplierPropsType = {
  supplier: Supplier
  headerText?: string
}

const SupplierCard = ({
  supplier: givenSupplier,
  headerText,
}: FeaturedSupplierPropsType) => {
  const { title, slug, supplier } = givenSupplier

  if (supplier) {
    return (
      <div className="bg-grey-50 w-full mx-auto mt-0 flex flex-col rounded-lg overflow-hidden shadow mb-8">
        {headerText && (
          <div className="py-2 bg-blue-main text-white w-full text-center align-center mx-auto">
            <h2 className="text-2xl">{headerText}</h2>
          </div>
        )}
        {supplier.image && supplier.image.sourceUrl && (
          <div className="w-full relative rounded-lg h-full overflow-hidden">
            <a
              href={supplier.url || undefined}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={supplier.image.sourceUrl}
                width={supplier.image.mediaDetails?.width || undefined}
                height={supplier.image.mediaDetails?.height || undefined}
                alt={supplier.image.altText || undefined}
                layout="responsive"
                objectFit="fill"
                title={title || undefined}
              />
            </a>
          </div>
        )}

        {supplier.text && (
          <div className="p-8 h-full">
            <div className="flex items-baseline text-gray-500">
              <p className="text-center">{supplier.text}</p>
            </div>
          </div>
        )}

        <div
          className="bg-blue-main text-gray-100 text-center w-full"
          css={underSelect}
        >
          <a
            href={supplier.url || undefined}
            target="_blank"
            rel="noreferrer"
            className="flex py-2 items-center justify-center w-full h-full pl-4"
          >
            <Underlined className="target">Visit {title}</Underlined>
            <div className="px-4">
              <Icon
                name="external-link"
                className="text-gray-700 w-4 ml-4"
                type="regular"
                iconKey={supplier.url + "--open-new-window"}
              />
            </div>
          </a>
        </div>
      </div>
    )
  }
  return <div>Error</div>
}

export default SupplierCard
