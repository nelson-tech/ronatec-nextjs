"use client"

import { Tab } from "@headlessui/react"

import type { ProductImage, Product } from "payload/generated-types"

import Image from "@components/Image"

type ProductGalleryPropsType = {
  featuredImage: ProductImage | null
  images: (ProductImage | null)[] | undefined
  wcImages: Exclude<Product["wc"], undefined>["images"]
}

const ProductGallery = ({
  images: productImages,
  featuredImage,
  wcImages,
}: ProductGalleryPropsType) => {
  const images = [featuredImage, ...(productImages ?? [])].filter((i) => i)

  return (
    <div
      id="product-image"
      className="w-full md:w-1/2 lg:w-full md:px-4 lg:px-0 flex relative"
    >
      {/* <!-- Image Gallery --> */}
      {images.length > 1 || (wcImages?.length ?? 0) > 1 ? (
        <Tab.Group as="div" className="flex flex-col w-full">
          <Tab.Panels className="object-contain w-full relative" as="div">
            {images.length > 1
              ? images.map(
                  (image, i) =>
                    image?.url && (
                      <Tab.Panel
                        key={image.id + "main"}
                        className="w-full aspect-square"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt ?? ""}
                          width={image.width ?? 0}
                          height={image.height ?? 0}
                          sizes="50vw"
                          className="rounded object-cover w-full h-full"
                        />
                      </Tab.Panel>
                    )
                )
              : wcImages?.map((image) => {
                  return (
                    image.src && (
                      <Tab.Panel
                        key={image.id + "main"}
                        className="w-full min-h-[300px]"
                        id="WCimage"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt ?? ""}
                          fill
                          sizes={image.sizes}
                          className="rounded object-contain w-full aspect-square"
                        />
                      </Tab.Panel>
                    )
                  )
                })}
          </Tab.Panels>

          {/* <!-- Image selector --> */}
          <div className="mx-auto w-full mt-4 px-4 lg:px-0 max-w-2xl sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-6 lg:gap-4">
              {images.length > 1
                ? images.map(
                    (image) =>
                      image?.url && (
                        <Tab
                          key={image.id + "thumbs"}
                          className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-sm
                  focus:outline-none focus:ring focus:ring-accent focus:ring-offset-4"
                        >
                          <span className="sr-only">{image.alt}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-sm w-full aspect-square">
                            <Image
                              src={image.url}
                              alt={image.alt ?? ""}
                              sizes="33vw"
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className="ring-transparent pointer-events-none absolute inset-0 rounded ring-2 ring-offset-2"
                            aria-hidden="true"
                          />
                        </Tab>
                      )
                  )
                : wcImages &&
                  wcImages.map(
                    (image) =>
                      image?.src && (
                        <Tab
                          key={image.id + "thumbs"}
                          className="relative flex w-full aspect-square cursor-pointer items-center justify-center rounded-sm
              focus:outline-none focus:ring focus:ring-accent focus:ring-offset-4"
                        >
                          <span className="sr-only">{image.alt}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-sm w-full aspect-square">
                            <Image
                              src={image.src}
                              alt={image.alt ?? ""}
                              fill
                              sizes="33vw"
                              className="h-full w-full object-contain"
                            />
                          </span>
                          <span
                            className="ring-transparent pointer-events-none absolute inset-0 rounded ring-2 ring-offset-2"
                            aria-hidden="true"
                          />
                        </Tab>
                      )
                  )}
            </Tab.List>
          </div>
        </Tab.Group>
      ) : images.length > 0 ? (
        <Image
          src={images.at(0)?.url ?? ""}
          alt={images.at(0)?.alt ?? ""}
          height={images.at(0)?.height ?? undefined}
          width={images.at(0)?.width ?? undefined}
          className="object-contain rounded overflow-hidden w-full h-full"
          // sizes={images.at(0).sizes ?? ""}
        />
      ) : (
        wcImages &&
        (wcImages?.length ?? 0) > 0 && (
          <Image
            src={wcImages.at(0)?.src ?? ""}
            alt={wcImages.at(0)?.alt ?? ""}
            width={200}
            height={200}
            className="object-contain rounded overflow-hidden w-full h-full"
          />
        )
      )}
    </div>
  )
}

export default ProductGallery
