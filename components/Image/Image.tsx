import { default as NextImage } from "next/image"

// import { ImageContainer } from "./style"

// ####
// #### Types
// ####

type Props = {
  src: string
  alt?: string
  fill?: boolean
  height?: number | undefined | null
  width?: number | undefined | null
  title?: string | undefined | null
  rounded?: "sm" | "md" | "lg"
  priority?: boolean
  sizes?: string | undefined
}

// ####
// #### Component
// ####

const Image = ({
  src,
  fill,
  alt,
  title,
  height,
  width,
  rounded,
  priority,
  sizes,
}: Props) => {
  const fillSize: { [key: string]: any } = { fill }
  height && (fillSize["height"] = height)
  width && (fillSize["width"] = width)
  return (
    // <ImageContainer rounded={rounded}>
    <NextImage
      src={src}
      alt={alt ?? ""}
      title={title || alt || ""}
      {...fillSize}
      priority={priority}
      sizes={sizes}
    />
    // </ImageContainer>
  )
}

export default Image
