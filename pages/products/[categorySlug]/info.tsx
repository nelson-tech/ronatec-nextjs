import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { ParsedUrlQuery } from "querystring"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetCategoryFromSlugDocument,
  GetCategoryFromSlugQuery,
  GetCategoryFromSlugQueryVariables,
  GetCategorySlugsDocument,
  GetCategorySlugsQuery,
  ProductCategory,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import Breadcrumbs from "@components/Breadcrumbs"
import PageTitle from "@components/PageTitle"
import CategoryInfoComponent from "@components/Pages/CategoryInfo"

// ####
// #### Types
// ####

interface IParams extends ParsedUrlQuery {
  categorySlug: string
}

// ####
// #### Component
// ####

const CategoryInfo = ({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const content = category?.product_category?.acf?.description

  return (
    <>
      <Layout>
        <PageTitle
          title={category ? `${category.name} Info` : "Category"}
          description={
            category?.description || "Information about a given category."
          }
          banner={false}
        />

        {category ? (
          <>
            <Breadcrumbs category={category} info />
            <CategoryInfoComponent content={content} />
          </>
        ) : (
          <>
            <div className=" mx-auto lg:max-w-7xl">No category found.</div>
          </>
        )}
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(CategoryInfo)

// ####
// #### External Props
// ####

export async function getStaticProps(context: GetStaticPropsContext) {
  const { categorySlug } = context.params as IParams

  const { client, ssrCache } = urql()

  const { data, error } = await client
    .query<GetCategoryFromSlugQuery, GetCategoryFromSlugQueryVariables>(
      GetCategoryFromSlugDocument,
      {
        id: categorySlug,
      },
    )
    .toPromise()

  const staticProps = {
    props: {
      category: (data?.productCategory as ProductCategory) || null,
      urqlState: ssrCache.extractData() || null,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { client } = urql()

  const { data } = await client
    .query<GetCategorySlugsQuery>(GetCategorySlugsDocument)
    .toPromise()

  type Path = {
    params: IParams
  }

  let paths: Path[] = []

  data?.productCategories?.nodes &&
    data.productCategories.nodes.map(category => {
      category?.slug && paths.push({ params: { categorySlug: category.slug } })
    })

  return {
    paths,
    fallback: true,
  }
}

// ####
// #### Styles
// ####
