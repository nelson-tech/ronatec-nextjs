import { LexicalPlugin } from "payload-plugin-lexical"
import nestedDocs from "@payloadcms/plugin-nested-docs"
import { cloudStorage } from "@payloadcms/plugin-cloud-storage"
import FormBuilder from "@payloadcms/plugin-form-builder"
// import { localization } from "@websolutespa/payload-plugin-localization"
// import "@websolutespa/payload-plugin-localization/dist/index.css"

import type { Plugin } from "payload/config"

import adapter from "./utils/s3adapter"

const S3_CDN_URL = process.env.S3_CDN_URL || ""

const plugins: Plugin[] = [
  // localization(),

  LexicalPlugin({
    // Only set this if you want to use the the AISuggest Feature
    ai: {
      openai_key: process.env.OPENAI_API_KEY || "",
    },
  }),

  FormBuilder({
    fields: {
      payment: false,
    },
  }),

  nestedDocs({
    collections: ["categories"],
    parentFieldSlug: "parent",
    breadcrumbsFieldSlug: "breadcrumbs",
    generateLabel: (_, doc) => doc.title as string,
    generateURL: (docs) => `/products/${docs.at(-1)?.slug}`,
  }),

  cloudStorage({
    collections: {
      images: {
        prefix: "media/images",
        disablePayloadAccessControl: true,
        adapter,
        generateFileURL: ({ prefix, filename }) =>
          `${S3_CDN_URL}/${prefix}/${filename}`,
      },
      productImages: {
        prefix: "media/images/products",
        disablePayloadAccessControl: true,
        adapter,
        generateFileURL: ({ prefix, filename }) =>
          `${S3_CDN_URL}/${prefix}/${filename}`,
      },
      documents: {
        prefix: "media/documents",
        disablePayloadAccessControl: true,
        adapter,
        generateFileURL: ({ prefix, filename }) =>
          `${S3_CDN_URL}/${prefix}/${filename}`,
      },
      videos: {
        prefix: "media/videos",
        disablePayloadAccessControl: true,
        adapter,
        generateFileURL: ({ prefix, filename }) =>
          `${S3_CDN_URL}/${prefix}/${filename}`,
      },
    },
  }),
]

export default plugins
