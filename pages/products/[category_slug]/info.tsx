import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import styled from "@emotion/styled"
import tw from "twin.macro"
import { ParsedUrlQuery } from "querystring"
import {
  default as parse,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"

import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import {
  getCategoryFromSlug,
  getCategorySlugs,
} from "@api/queries/pages/products"
import { CategoriesReturnType, CategoryReturnType } from "@api/queries/types"
import { getGeneralPageData } from "@api/queries/pages"
import { normalize } from "@api/utils"
import { isServer } from "@lib/utils"

import { Image } from "@components"

const CategoryInfo = ({
  category,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  menuItems && menuItemsVar(menuItems)

  if (category) {
    const content = category.product_category?.acf?.description

    const options: HTMLReactParserOptions = isServer()
      ? {}
      : {
          replace: domNode => {
            if (domNode instanceof Element) {
              if (domNode.name === "img") {
                return (
                  <Image
                    src={domNode.attribs.src}
                    alt={domNode.attribs.alt || domNode.attribs.src}
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
      <div className="w-screen">
        <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
          <h2>{category.name}</h2>
        </div>
        <Container>{content && parse(content, options)}</Container>
      </div>
    )
  }
  return <div>No category found.</div>
}

export default CategoryInfo

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
    ${tw`text-xl font-bold py-4`}
  }
  .column-container {
    ${tw`grid grid-cols-1 md:grid-cols-2 pb-4 px-0`}
    .column {
      ${tw`px-4 pb-4`}
      img {
        ${tw`mx-8`}
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
    ${tw`pt-4 mt-4 border-t-2`}
    div {
      ${tw`p-4`}
    }
  }
  // Quick edits below
  ${tw`pt-8 px-6 mr-8 text-gray-700`}
`
