import { InferGetStaticPropsType } from "next"
import { css } from "@emotion/react"
import tw from "twin.macro"

// import { initializeApollo } from "@lib/apollo"
import { addApolloState, initializeApollo, menuItemsVar } from "@lib/apollo"
import { getGeneralPageData } from "@api/queries/pages"
import { PageReturnType } from "@api/queries/types"
import { normalize } from "@api/utils"

// import { Layout, LoadingDots } from "@components/ui"
// import { IconCard, Slider } from "@components"

import { LoadingDots } from "@components/ui"
import { getRonatankData } from "@api/queries/pages/ronatank"
import {
  attributesToProps,
  default as parse,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser"
import styled from "@emotion/styled"
import { Image } from "@components"
import { ProductCategory } from "@api/gql/types"
import { useRouter } from "next/router"
import Link from "next/link"

// ####
// #### Dynamic Imports
// ####

const importOpts = {}

// ####
// #### Component
// ####

const Ronatank = ({
  page,
  productCategories,
  loading,
  error,
  menuItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (loading) return <LoadingDots />
  menuItemsVar(menuItems)

  const { title, slug, content } = page

  const router = useRouter()

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
    <MainContainer menu={productCategories.nodes} title={title || ""}>
      <Container>{content && parse(content, options)}</Container>
    </MainContainer>
  )
}

const SidebarMenu = ({ menu }: { menu: ProductCategory[] }) => {
  return (
    <div className="pt-8 px-4 text-sm w-full">
      {menu.map(item => {
        return (
          <div
            className="text-base border-t-2 border-gray-100 py-4"
            key={"sidebar" + item.slug}
          >
            <Link href={`/products/${item.slug}`} passHref>
              <a title={item.name || ""}>{item.name}</a>
            </Link>
            {(item.children?.nodes?.length || 0) > 0 && (
              <ul className="w-full list-disc ml-4 text-xs pt-4">
                {item.children!.nodes!.map(child => {
                  return (
                    <li key={"submenuItem" + `${child?.slug}`}>
                      <Link
                        href={`/products/${item.slug}/${child?.slug}`}
                        passHref
                      >
                        <a title={`${item.name} / ${child?.name}`}>
                          {child?.name}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

type MainContainerProps = {
  children: any
  menu: ProductCategory[]
  title: string
}

const MainContainer = ({ children, menu, title }: MainContainerProps) => {
  return (
    <div className="w-screen">
      <div className="w-screen mx-auto text-2xl -ml-5 bg-green-main text-white text-center py-2">
        <h2>{title}</h2>
      </div>
      <div className="lg:flex flex-row-reverse w-screen">
        <div className="basis-3/4">{children}</div>
        <div className="basis-1/4">
          <SidebarMenu menu={menu} />
        </div>
      </div>
    </div>
  )
}

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const client = initializeApollo({})

  const {
    data: { page, productCategories },
    loading,
    error,
  }: PageReturnType & {
    data: { productCategories: { nodes: ProductCategory[] } }
  } = await client.query({
    query: getRonatankData,
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
    props: {
      loading,
      page,
      productCategories,
      menuItems,
      error: error || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  addApolloState(client, staticProps)

  return staticProps
}

export default Ronatank

// ####
// #### Style
// ####

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
