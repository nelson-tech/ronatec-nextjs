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
}

const generateMetadata = async ({ product }: GenerateMetadataArgs) => {
  try {
    const metaBase: MetaBaseType = {
      title: product?.title ?? "",
      description: product?.shortDescription ?? "",
    }

    const openAI = createChat({
      apiKey: process.env.OPENAI_API_KEY ?? "",
      model: "gpt-4o-mini",
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

    const prompt = `Generate SEO metadata for the following product data: ${JSON.stringify(
      promptData
    )}
  
  Return a valid JSON object with this structure:
  {
    "title": "SEO optimized title",
    "description": "SEO description (max 160 characters)"
  }
  
  Only return the JSON object, no other text.`

    try {
      const response = await openAI.sendMessage(prompt).catch((e) => {
        console.warn("Error generating metadata with AI:", e)
        return null
      })

      if (response && response.content) {
        try {
          // Try to parse JSON response
          const content = JSON.parse(
            response.content as string
          ) as Partial<MetaBaseType>
          content.title && (metaBase.title = content.title)
          content.description && (metaBase.description = content.description)
          // content.keywords &&
          //   Array.isArray(content.keywords) &&
          //   content.keywords.length > 0 &&
          //   (metaBase.keywords = content.keywords)
        } catch (parseError) {
          console.warn("Failed to parse AI response as JSON:", parseError)
          // If JSON parsing fails, just use the original metadata
        }
      }
    } catch (error) {
      console.warn("Error generating metadata", error)
    }

    return metaBase
  } catch (error) {
    console.warn("Error generating metadata", error)
    return null
  }
}

export default generateMetadata
