import PageHeader from "@components/PageHeader"
import Link from "next/link"
import getPayloadClient from "~payload/payloadClient"

const getNewsArticles = async () => {
  const client = await getPayloadClient()

  const data = await client.find({
    collection: "newsArticles",
    sort: "date",
    limit: 100,
  })

  return data
}

const NewsPage = async () => {
  const articles = await getNewsArticles()
  return (
    <>
      <PageHeader title="Ronatec in the News" />
      <div className="max-w-7xl px-8 lg:px-16 my-8 mx-auto">
        <div className="flex flex-col gap-8">
          {articles?.docs?.map((article, index) => (
            <div key={index} className="p-4 border-2 border-gray-200">
              <h2 className="text-2xl">{article?.title}</h2>

              <p className="py-4">{article?.text}</p>

              {article?.url && (
                <Link href={article.url} className="">
                  Link To Article
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NewsPage
