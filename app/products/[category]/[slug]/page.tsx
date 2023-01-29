import { ParsedUrlQuery } from "querystring"

import ProductBySku from "@components/Pages/ProductBySku"
import Link from "@components/Link"
import {
  GetCategoryBySlugDocument,
  GetProductDataBySlugDocument,
  Product,
  ProductCategory,
} from "@api/codegen/graphql"
import useClient from "@api/client"

const messages = {
  seo: { title: "Product", description: "No product found." },
  productMissing: {
    title: "No product found.",
    buttonText: "Visit our shop",
  },
}

// ####
// #### Types
// ####

interface IParams extends ParsedUrlQuery {
  slug: string
  categorySlug: string
}

const getProductBySlug = async (category: string, slug: string) => {
  const client = useClient()

  const productData = await client.request(GetProductDataBySlugDocument, {
    id: slug,
  })

  const categoryData = await client.request(GetCategoryBySlugDocument, {
    id: category,
  })

  return {
    category: categoryData.productCategory as ProductCategory,
    product: productData.product as Product,
  }
}

// ####
// #### Component
// ####

const ProductPage = async ({
  params,
}: {
  params: { category: string; slug: string }
}) => {
  const { category, product } = await getProductBySlug(
    params.category,
    params.slug,
  )

  return (
    <>
      <div />
      {product && category ? (
        <>
          <ProductBySku product={product} category={category} />
        </>
      ) : (
        <>
          <div className="h-screen -mt-20 justify-center items-center flex flex-col mx-auto text-lg lg:text-xl text-blue-dark">
            <div>{messages.productMissing.title}</div>

            <Link
              href="/products"
              title={messages.productMissing.buttonText}
              className="mt-8 py-4 px-6 rounded-md bg-blue-main hover:bg-green-main text-white transition"
            >
              {messages.productMissing.buttonText}
            </Link>
          </div>
        </>
      )}
    </>
  )
}

export default ProductPage

// ####
// #### Data Fetching
// ####

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { client } = urql()

//   const { data, error } = await client
//     .query<GetProductsWithCategoriesQuery>(GetProductsWithCategoriesDocument)
//     .toPromise()

//   type Path = {
//     params: IParams
//   }

//   const paths: Path[] = []

//   data?.products?.nodes &&
//     data.products.nodes.map(product => {
//       if (product?.productCategories?.nodes) {
//         product.productCategories.nodes.map(category => {
//           if (product?.slug && category?.slug) {
//             const path = {
//               params: { slug: product.slug, categorySlug: category.slug },
//             }
//             paths.push(path)
//           }
//         })
//       }
//     })

//   return {
//     paths,
//     fallback: false,
//   }
// }
