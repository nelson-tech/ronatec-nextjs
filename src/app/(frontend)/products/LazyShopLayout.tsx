"use client"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import dynamic from "next/dynamic"

const ShopLayout = dynamic(() => import("./ShopLayout"), {
  loading: () => <LoadingSpinner />,
})

export default ShopLayout
