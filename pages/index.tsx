import type { InferGetStaticPropsType} from "next"
import getAllProducts from "@ecommerce/product/get-all-products"
import { getCommerceConfig } from "@ecommerce/api/config"


export async function getStaticProps(){
  const config = getCommerceConfig()

  const products = await getAllProducts(config)

  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60 // Every 4 hours
  }
}


export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div>
      {JSON.stringify(products)}
    </div>
  )
}
