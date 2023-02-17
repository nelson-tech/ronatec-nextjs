import { default as NextImage } from "next/image"

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
  priority?: boolean
  sizes?: string | undefined
  className?: string | undefined
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
  priority,
  className,
  sizes,
}: Props) => {
  const fillSize: { [key: string]: any } = { fill }
  height && (fillSize["height"] = height)
  width && (fillSize["width"] = width)
  return (
    // <ImageContainer rounded={rounded}>
    <NextImage
      className={className}
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
