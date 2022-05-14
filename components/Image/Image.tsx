import { default as NextImage } from "next/image"
import { ImageContainer } from "./style"

type Props = {
  src: string
  alt?: string
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined
  objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "inherit"
    | "initial"
    | "none"
    | "revert"
    | "scale-down"
    | "unset"
    | undefined
  height?: string | number | undefined | null
  width?: string | number | undefined | null
  title?: string | undefined | null
  rounded?: "sm" | "md" | "lg"
  priority?: boolean
  sizes?: string | undefined
}

const Image = ({
  src,
  layout = "fill",
  objectFit = "contain",
  alt,
  title,
  height,
  width,
  rounded,
  priority,
  sizes,
}: Props) => {
  return (
    <ImageContainer rounded={rounded}>
      <NextImage
        src={src}
        alt={alt}
        title={title || alt || ""}
        layout={layout}
        objectFit={objectFit}
        height={height || 250}
        width={width || 250}
        priority={priority}
        sizes={sizes}
      />
    </ImageContainer>
  )
}

export default Image
