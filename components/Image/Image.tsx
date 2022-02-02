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
  rounded?: "sm" | "md" | "lg"
}

const Image = ({
  src,
  layout = "fill",
  objectFit = "contain",
  alt,
  height,
  width,
  rounded,
}: Props) => {
  return (
    <ImageContainer rounded={rounded}>
      <NextImage
        src={src}
        alt={alt}
        title={alt}
        layout={layout}
        objectFit={objectFit}
        height={height || 250}
        width={width || 250}
      />
    </ImageContainer>
  )
}

export default Image
