"use client"

import { NextSeo } from "next-seo"

// ####
// #### Types
// ####

type PageTitlePropsType = {
  title: string
  description?: string
  seoConfig?: any
  banner?: boolean
}

// ####
// #### Component
// ####

const PageTitle = ({
  title,
  description,
  seoConfig,
  banner = true,
}: PageTitlePropsType) => {
  return (
    <>
      <NextSeo title={title} description={description} {...seoConfig} />
      {banner && (
        <div className="w-screen mx-auto text-2xl bg-highlight text-white text-center py-2">
          <h2>{title}</h2>
        </div>
      )}
    </>
  )
}

export default PageTitle
