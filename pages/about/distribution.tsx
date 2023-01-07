import { InferGetStaticPropsType } from "next"

import urql from "@api/urql/serverClient"
import withUrql from "@api/urql/hoc"
import {
  GetDistributionDataDocument,
  GetDistributionDataQuery,
  Supplier,
} from "@api/codegen/graphql"

import Layout from "@components/ui/Layout"
import PageTitle from "@components/PageTitle"
import DistributionComponent from "@components/Pages/Distribution"

// ####
// #### Component
// ####

const Distribution = ({
  suppliers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Layout>
        <PageTitle
          title={"Distribution"}
          description="A list of companies whose products we distribute."
        />
        <DistributionComponent suppliers={suppliers} />
      </Layout>
    </>
  )
}

// ####
// #### API
// ####

export default withUrql(Distribution)

// ####
// #### Data Fetching
// ####

export async function getStaticProps() {
  const { client, ssrCache } = urql()

  const { data } = await client
    .query<GetDistributionDataQuery>(GetDistributionDataDocument)
    .toPromise()

  const staticProps = {
    props: {
      suppliers:
        (data?.suppliers?.nodes as Supplier[] | null | undefined) || null,
      urqlState: ssrCache.extractData(),
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }

  return staticProps
}
