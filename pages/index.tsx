import type { InferGetStaticPropsType} from "next"
import getAllProducts from "@shopify/product/get-all-products"

export async function getStaticProps(){
  const products = await getAllProducts()

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
