import { ApolloError } from "@apollo/client"

import { Maybe, Scalars } from "@api/gql/types"

export type ApolloGenericReturnDataType = {
  menu: MainMenuReturnType
}

export type ApolloReturnInfoType = {
  loading: boolean
  error?: ApolloError | undefined
}

export type MenuItemType = {
  path: Maybe<Scalars["String"]>
  label: Maybe<Scalars["String"]>
  childItems: {
    nodes: MenuItemType[]
  }
}

export type MainMenuReturnType = {
  name: Maybe<Scalars["String"]>
  menuItems: {
    nodes: MenuItemType[]
  }
}

export type ImageMediaDetailsType = {
  height: Maybe<Scalars["Int"]>
  width: Maybe<Scalars["Int"]>
}

export type ImageDetailsType = {
  altText: Maybe<Scalars["String"]>
  sourceUrl: Maybe<Scalars["String"]>
  mimeType: Maybe<Scalars["String"]>
  mediaDetails: ImageMediaDetailsType
  fileSize: Maybe<Scalars["Int"]>
}

export type ImageType = {
  image: ImageDetailsType
}

export type CardType = {
  title: Maybe<Scalars["String"]>
  icon: Maybe<Scalars["String"]>
  content: Maybe<Scalars["String"]>
}

export type LinkCardType = CardType & {
  linkText: Maybe<Scalars["String"]>
  linkUrl: Maybe<Scalars["String"]>
}

export type PageCommonType = {
  title: Maybe<Scalars["String"]>
  slug: Maybe<Scalars["String"]>
}

export type ImageCardType = CardType & ImageType

export type TitleContentType = {
  title: Maybe<Scalars["String"]>
  content: Maybe<Scalars["String"]>
}
