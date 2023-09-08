import { config } from "dotenv"
import { createChat } from "completions"
import type { Category, Product } from "~payload-types"
import { UpdateProduct } from "@lib/types/product"
config()

type GenerateMetadataArgs = {
  product: Product | UpdateProduct | null | undefined
}

type MetaBaseType = {
  title: string
  description: string
  keywords: string[]
}

const generateMetadata = async ({ product }: GenerateMetadataArgs) => {
  const metaBase: MetaBaseType = {
    title: product?.title ?? "",
    description: product?.shortDescription ?? "",
    keywords: [],
  }

  const openAI = createChat({
    apiKey: process.env.OPENAI_API_KEY ?? "",
    model: "gpt-3.5-turbo",
  })

  const catNames = product?.categories
    ?.map((cat: string | Category) => typeof cat === "object" && cat.title)
    .filter((cat): cat is string => !!cat)

  const promptData = {
    title: product?.title,
    description: product?.description,
    wcDescription: product?.wc?.description,
    shortDescription: product?.shortDescription,
    categories: catNames,
  }

  const prompt = `Generate SEO title, description (max 160 characters), and keywords given the following product data:
  ${JSON.stringify(promptData)}.`

  try {
    const response = await openAI
      .sendMessage(prompt, {
        expect: {
          examples: [
            {
              title: "Electroless Nickel Plating",
              description:
                "Ronatec was the first provider of Electroless Nickel Plating Processes in California!",
              keywords: [
                "Electroless Nickel Plating",
                "Ronatec",
                "nickel plating systems",
                "corrosion protection",
                "wear resistance",
                "solderability",
                "plate thickness",
                "state-of-the-art equipment",
                "quality control",
              ].toString(),
            },
          ],
          schema: {
            additionalProperties: false,
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              keywords: { type: "array" },
            },
            required: ["title", "description", "keywords"],
          },
        },
      })
      .catch((e) => console.warn("Error", e))

    if (response) {
      const content = response.content as Partial<MetaBaseType>
      content.title && (metaBase.title = content.title)
      content.description && (metaBase.description = content.description)
      content.keywords &&
        (content.keywords?.length || 0) > 0 &&
        (metaBase.keywords = content.keywords)
    }
  } catch (error) {
    console.warn("Error generating metadata", error)
  }

  return metaBase
}

export default generateMetadata
