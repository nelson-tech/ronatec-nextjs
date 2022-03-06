import { NextSeo } from "next-seo"

type PageTitlePropsType = {
  title: string
  description?: string
  seoConfig?: any
  banner?: boolean
}

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
        <div className="w-screen mx-auto text-2xl bg-green-main text-white text-center py-2">
          <h2>{title}</h2>
        </div>
      )}
    </>
  )
}

export default PageTitle
