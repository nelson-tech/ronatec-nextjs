import { CardType, ImageCardType, LinkCardType } from "@api/queries/types"
import { IMAGE_PLACEHOLDER, normalizeImage } from "./images"
import {
  IconStyle,
  NormalizedCard,
  NormalizedImageCard,
  NormalizedLinkCard,
} from "./types"

const error = (field: string): void => {
  console.log(`Card ${field} not supplied`)
}

const CARD_PLACEHOLDER: NormalizedCard = {
  title: "Missing Card",
  icon: {
    name: "image",
    style: "regular",
  },
  content: "No card info received from server.",
}

const LINK_CARD_PLACEHOLDER: NormalizedLinkCard = {
  ...CARD_PLACEHOLDER,
  link: {
    url: "#",
    text: "No link.",
  },
}

const IMAGE_CARD_PLACEHOLD: NormalizedImageCard = {
  ...CARD_PLACEHOLDER,
  image: IMAGE_PLACEHOLDER,
}

export const normalizeCard = (card: CardType): NormalizedCard => {
  if (!card) {
    error("value")
    return CARD_PLACEHOLDER
  }
  let title = card.title
  if (!title) {
    title = CARD_PLACEHOLDER.title
    error("title")
  }

  let content = card.content
  if (!content) {
    content = CARD_PLACEHOLDER.content
    error("content")
  }

  let iconData = card.icon
  if (!iconData) {
    iconData = `${CARD_PLACEHOLDER.icon.name}:${CARD_PLACEHOLDER.icon.style}`
    error("icon")
  }

  const iconArr = iconData.split(":")

  const iconName = iconArr[0]

  let iconStyle: IconStyle = undefined
  if (iconArr.length > 1) {
    if (
      ["solid", "thin", "regular", "brands", "duotone", undefined].includes(
        iconStyle,
      )
    ) {
      iconStyle = iconArr[1] as IconStyle
    }
  }

  return {
    title,
    content,
    icon: { name: iconName, style: iconStyle },
  }
}

export const normalizeCards = (cards: CardType[]): NormalizedCard[] => {
  if (cards.length < 1) {
    error("array")
    return [CARD_PLACEHOLDER]
  }

  const normalizedCards = cards.map<NormalizedCard>(card => {
    const normalizedCard = normalizeCard(card)
    return normalizedCard
  })

  return normalizedCards
}

export const normalizeLinkCards = (
  cards: LinkCardType[],
): NormalizedLinkCard[] => {
  if (cards.length < 1) {
    error("array")
    return [LINK_CARD_PLACEHOLDER]
  }

  const normalizedLinkCards = cards.map<NormalizedLinkCard>(card => {
    const normalizedCard = normalizeCard(card)

    let linkURL = card?.linkUrl
    if (!linkURL) {
      linkURL = LINK_CARD_PLACEHOLDER.link.url
      error("linkURL")
    }

    let linkText = card?.linkText
    if (!linkText) {
      linkText = LINK_CARD_PLACEHOLDER.link.text
      error("linkText")
    }

    return {
      ...normalizedCard,
      link: { url: linkURL, text: linkText },
    }
  })

  return normalizedLinkCards
}

export const normalizeImageCards = (
  cards: ImageCardType[],
): NormalizedImageCard[] => {
  if (cards.length < 1) {
    error("array")
    return [IMAGE_CARD_PLACEHOLD]
  }

  const normalizedImageCards = cards.map<NormalizedImageCard>(card => {
    const { image, ...plainCard } = card

    const normalizedCard = normalizeCard(plainCard)
    const normalizedImage = normalizeImage({ image })

    return {
      ...normalizedCard,
      image: { ...normalizedImage },
    }
  })

  return normalizedImageCards
}
