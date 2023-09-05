"use client"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import dynamic from "next/dynamic"

const WarehousesCards = dynamic(() => import("./WarehousesCards"), {
  loading: () => <LoadingSpinner />,
})

export default WarehousesCards
