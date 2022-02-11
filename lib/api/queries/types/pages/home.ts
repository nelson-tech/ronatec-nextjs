import { Maybe, Scalars } from "@api/gql/types"
import {
  ApolloReturnInfoType,
  LinkCardType,
  ImageDetailsType,
  ImageType,
  PageCommonType,
} from ".."

export type HomeHeroType = {
  header: Maybe<Scalars["String"]>
  icon: Maybe<Scalars["String"]>
  linkText: Maybe<Scalars["String"]>
  linkUrl: Maybe<Scalars["String"]>
  text: Maybe<Scalars["String"]>
}

export type HomeSliderType = {
  images: ImageType[]
}

export type HomeCardsType = {
  card: LinkCardType[]
}

export type YoutubeLinkType = {
  videoId: Maybe<Scalars["String"]>
  title: Maybe<Scalars["String"]>
}

export type SupplierType = {
  url: Maybe<Scalars["String"]>
  text: Maybe<Scalars["String"]>
  image: ImageDetailsType
}

export type HomeFeaturedSupplierType = PageCommonType & {
  supplier: SupplierType
}

export type HomePageType = PageCommonType & {
  hero: HomeHeroType[]
  slider: HomeSliderType
  cards: HomeCardsType
  youtubeLink: YoutubeLinkType
  featuredSupplier: { featuredSupplier: HomeFeaturedSupplierType }
}

export interface HomeQueryDataReturnType {
  page: HomePageType
}

export interface HomeQueryReturnType extends ApolloReturnInfoType {
  data: HomeQueryDataReturnType
}
