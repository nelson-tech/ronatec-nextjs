import {
  ApolloReturnInfoType,
  ImageType,
  PageCommonType,
  TitleContentType,
} from ".."

export type AboutPageType = PageCommonType & {
  infoCards: {
    cards: (TitleContentType & ImageType)[]
  }
}

export interface AboutQueryDataReturnType {
  page: AboutPageType
}

export interface AboutQueryReturnType extends ApolloReturnInfoType {
  data: AboutQueryDataReturnType
}
