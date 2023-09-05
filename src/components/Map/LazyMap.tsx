"use client"

import LoadingSpinner from "@components/ui/LoadingSpinner"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./Map"), {
  loading: () => <LoadingSpinner />,
})

export default Map
