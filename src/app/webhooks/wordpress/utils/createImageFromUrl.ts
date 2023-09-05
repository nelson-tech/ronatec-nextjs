import type { Payload } from "payload"
import { File } from "payload/dist/uploads/types"
import getMimeTypeFromArrayBuffer from "./getMimeTypeFromArrayBuffer"
import { MediaCollectionTitles } from "./types"

type CreateImageFromUrlArgs = {
  payload: Payload
  collection: MediaCollectionTitles
  url: string
  alt: string
}

const createImageFromUrl = async ({
  payload,
  url,
  alt,
  collection,
}: CreateImageFromUrlArgs) => {
  let fimg = await fetch(url)
  let data = Buffer.from(await fimg.arrayBuffer())

  const file: File = {
    data,
    name: url.split("/").at(-1) ?? "",
    mimetype: getMimeTypeFromArrayBuffer(data) ?? "",
    size: data.byteLength,
  }

  console.log("File info", file.name, file.mimetype, file.size, alt)

  const newImage = await payload.create({ collection, data: { alt }, file })

  console.log("New image", newImage)

  return newImage
}

export default createImageFromUrl
