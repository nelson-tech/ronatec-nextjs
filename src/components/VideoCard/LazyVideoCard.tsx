"use client"

import dynamic from "next/dynamic"

import LoadingSpinner from "@components/ui/LoadingSpinner"

const VideoCard = dynamic(() => import("./VideoCard"), {
  loading: () => <LoadingSpinner />,
})

export default VideoCard
