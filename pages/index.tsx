import type { InferGetStaticPropsType } from "next"
import getAllProducts from "@ecommerce/product/get-all-products"
import { getCommerceConfig } from "@ecommerce/api/config"
import { Layout } from "@components/common"
import { ProductCard } from "@components/product"
import { Grid, Hero, Marquee } from "@components/ui"

export async function getStaticProps() {
  const config = getCommerceConfig()

  const products = await getAllProducts(config)

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60, // Every 4 hours
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid>
        {products.slice(0, 3).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <Hero
        headline="Drones, watercooling, and metal finishing."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
      <Grid layout="B">
        {products.slice(0, 3).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </>
  )
}

Home.Layout = Layout
