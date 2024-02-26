import Link from "@components/Link"
import getUsedData from "./usedEquipment.load"
import ShopLayout from "../products/ShopLayout"

const UsedEquipmentPage = async () => {
  const { categories, productsData } = await getUsedData()
  return (
    <div className="mx-auto max-w-7xl px-2 w-full">
      <div className="flex flex-col md:flex-row gap-8 justify-between items-center p-2 mb-8 mt-4">
        <h1 className="font-bold text-4xl">Used Equipment</h1>

        <div>
          <div className="flex justify-end">
            <Link
              href="/services/sell-your-equipment"
              className="flex items-center justify-center px-8 py-3 border border-transparent \
                rounded text-white bg-accent hover:bg-blue-dark md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Sell your equipment
            </Link>
          </div>
        </div>
      </div>

      <div>
        <ShopLayout
          subCategories={categories}
          productsData={productsData}
          used
        />
      </div>
    </div>
  )
}

export default UsedEquipmentPage
