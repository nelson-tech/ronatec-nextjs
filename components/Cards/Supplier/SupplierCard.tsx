import InformationCircleIcon from "@heroicons/react/solid/InformationCircleIcon"

import { Supplier, Supplier_Supplier } from "@api/gql/types"

import Image from "@components/Image"
import Icon from "@components/ui/Icon"
import { Underlined, underSelect } from "@styles/utils"

// ####
// #### Types
// ####

export type ChosenSupplierType = Supplier_Supplier & {
  title: string
}

export type PropsType = {
  supplier: Supplier
  headerText?: string
  featured?: boolean
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
  setChosenSupplier?: (chosen: ChosenSupplierType | undefined) => void
  chosenSupplier?: ChosenSupplierType
}

// ####
// #### Component
// ####

const SupplierCard = ({
  supplier: givenSupplier,
  headerText,
  featured = false,
  isOpen,
  setIsOpen,
  setChosenSupplier,
  chosenSupplier,
}: PropsType) => {
  const { title, supplier } = givenSupplier

  if (supplier) {
    if (featured) {
      return (
        <div
          className="bg-grey-50 w-full mx-auto mt-0 flex flex-col rounded-lg overflow-hidden shadow mb-8"
          data-testid="supplier-card-featured"
        >
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
                  title={title}
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

    if (setIsOpen && setChosenSupplier) {
      const active = isOpen && chosenSupplier?.title === title
      return (
        <div
          className="bg-grey-50 mx-auto w-full flex items-center flex-row rounded-lg shadow mb-8 cursor-pointer"
          data-testid="supplier-card"
        >
          <div
            onClick={() => {
              setIsOpen(true)
              title && setChosenSupplier({ ...givenSupplier.supplier, title })
            }}
            data-testid="supplier-card-clickable"
            className={`
                ${active ? "" : "text-opacity-90"}
                group transition relative px-3 py-2 rounded-md inline-flex items-center w-full hover:text-opacity-100 focus:outline-none `}
          >
            <div className="py-4 pl-4 pr-5 font-bold text-gray-600 text-xs md:text-base group-hover:text-green-main">
              {title}
            </div>
            <InformationCircleIcon
              className={`${
                active
                  ? "text-green-main"
                  : "text-blue-main group-hover:text-gray-400"
              }
                  mr-2 h-5 w-5 absolute right-0 transition`}
              aria-hidden="true"
            />
          </div>
        </div>
      )
    }
  }
  return <div data-testid="supplier-card-error">Error</div>
}

export default SupplierCard
