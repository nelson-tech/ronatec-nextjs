import { ProductCategory } from "@api/gql/types"
import { getGeneralPageData } from "@api/queries/pages"
import {
  getCategoryFromSlug,
  getCategorySlugs,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { ParsedUrlQuery } from "querystring"

import { Image } from "@components"
import {
  default as parse,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"
import Link from "next/link"
import styled from "@emotion/styled"
import tw from "twin.macro"

const CategoryPage = ({
  category,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)

  const content = category.product_category?.acf?.description

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (domNode instanceof Element) {
        if (domNode.name === "img") {
          return (
            <Image
              src={domNode.attribs.src}
              height={domNode.attribs.height}
              width={domNode.attribs.width}
              objectFit="cover"
              layout="responsive"
              rounded="lg"
            />
          )
        }
      }
    },
  }

  return (
    <MainContainer category={category} title={category.name || ""}>
      <Container>{content && parse(content, options)}</Container>
    </MainContainer>
  )
}

const SidebarMenu = ({ category }: { category: ProductCategory }) => {
  const products = category.products?.nodes
  const subCategories = category.children?.nodes
  return (
    <div className="pt-8 px-4 text-sm w-full">
      <h2>Products</h2>
      {products && (
        <div>
          {products.map(product => {
            if (product) {
              return (
                <div
                  className="text-base border-t-2 border-gray-100 py-4"
                  key={product.id}
                >
                  <Link
                    href={`/products/${category.slug}/${product.slug}`}
                    passHref
                  >
                    <a title={product.name || ""}>{product.name}</a>
                  </Link>
                </div>
              )
            }
          })}
        </div>
      )}
      {subCategories && (
        <div>
          <h2>Sub Categories</h2>
          {subCategories.map(subCategory => {
            if (subCategory) {
              const subSubCategories = subCategory.children?.nodes
              return (
                <div
                  className="text-base border-t-2 border-gray-100 py-4"
                  key={subCategory.id}
                >
                  <Link href={`/products/${subCategory.slug}`} passHref>
                    <a title={subCategory.name || ""}>{subCategory.name}</a>
                  </Link>
                  {subSubCategories && (
                    <ul className="w-full list-disc ml-4 text-xs pt-4">
                      {subSubCategories.map(subSubCategory => {
                        if (subSubCategory) {
                          return (
                            <li key={subSubCategory.id}>
                              <Link
                                href={`/products/${subSubCategory.slug}`}
                                passHref
                              >
                                <a
                                  title={`${subCategory.name} / ${subSubCategory.name}`}
                                >
                                  {subSubCategory.name}
                                </a>
                              </Link>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  )}
                </div>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}

type MainContainerProps = {
  children: any
  category: ProductCategory
  title: string
}

const MainContainer = ({ children, category, title }: MainContainerProps) => {
  return (
    <div className="w-screen">
      <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
        <h2>{title}</h2>
      </div>
      <div className="lg:flex flex-row-reverse w-screen">
        <div className="basis-3/4">{children}</div>
        <div className="basis-1/4">
          <SidebarMenu category={category} />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

interface IParams extends ParsedUrlQuery {
  category_slug: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { category_slug } = context.params as IParams

  const client = initializeApollo({})

  const {
    data: { productCategory: category },
    loading,
    error,
  }: CategoryReturnType = await client.query({
    query: getCategoryFromSlug,
    variables: {
      id: category_slug,
    },
    errorPolicy: "all",
  })

  const {
    data: { menu },
    loading: menuLoading,
    error: menuError,
  } = await client.query({
    query: getGeneralPageData,
  })

  const menuItems = normalize.menu(menu)

  const staticProps = {
    props: { menuItems, category },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo({})

  const {
    data: { productCategories },
    loading,
    error,
  }: CategoriesReturnType = await client.query({ query: getCategorySlugs })
  type Path = {
    params: IParams
  }
  let paths: Path[] = []
  productCategories &&
    productCategories.nodes &&
    productCategories.nodes.map(category => {
      paths.push({ params: { category_slug: category.slug! } })
    })

  return {
    paths,
    fallback: true,
  }
}

const Container = styled.div`
  h2 {
    ${tw`text-2xl py-4`}
  }
  .column-container {
    ${tw`grid grid-cols-2 pb-4 px-0`}
    .column {
      ${tw`px-4`}
      img {
        ${tw`px-4`}
      }
    }
  }

  div {
    ${tw`text-sm`}
  }

  ul {
    ${tw`list-disc ml-4`}
    li {
      ${tw`ml-4 pt-4`}
    }
  }
  .text {
    ${tw`p-4 mt-4 border-t-2`}
    div {
      ${tw`p-4`}
    }
  }
  // Quick edits below
  ${tw`py-8 px-4 text-gray-700`}
`
