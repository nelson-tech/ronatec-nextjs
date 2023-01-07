import type { InferGetStaticPropsType } from "next"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import getCarouselItemQuery from "@api/queries/dynamic/getCarouselItem"
import {
  GetHomeDataDocument,
  GetHomeDataQuery,
  Page,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import Home from "@components/Pages/Home"
import PageTitle from "@components/PageTitle"

// ####
// #### Component
// ####

const HomePage = ({
  page: home,
  topSellers,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <PageTitle
          title={"Ronatec C2C, Inc."}
          description="Chemicals and equipment for metal finishing and beverage industries."
          banner={false}
        />
        <Home
          home={home}
          topSellers={topSellers}
          categories={categories}
        ></Home>
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(HomePage)

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const { client, ssrCache } = urql()

  const { data: pageData } = await client
    .query<GetHomeDataQuery>(GetHomeDataDocument)
    .toPromise()

  // Product Categories Carousel
  const { data: catData } = await client
    .query(getCarouselItemQuery("productCategories(where: {hideEmpty: true})"))
    .toPromise()

  // Top-selling products
  const { data: topSellerData } = await client
    .query(
      getCarouselItemQuery(
        "products(where: {orderby: {field: TOTAL_SALES, order: DESC}}, first: 8)",
        true,
      ),
    )
    .toPromise()

  const staticProps = {
    props: {
      page: (pageData?.page as Page | null | undefined) || null,
      categories:
        (catData?.productCategories?.nodes as
          | ProductCategory[]
          | null
          | undefined) || null,
      topSellers:
        (topSellerData?.products?.nodes as Product[] | null | undefined) ||
        null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}
