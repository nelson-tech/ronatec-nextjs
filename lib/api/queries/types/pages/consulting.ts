import { Maybe, Scalars } from "@api/gql/types"
import {
  ApolloGenericReturnDataType,
  ApolloReturnInfoType,
  ImageCardType,
  ImageType,
  PageCommonType,
  TitleContentType,
} from ".."

export type ConsultingCalloutReturnType = {
  style: Maybe<Scalars["String"]>
  content: Maybe<Scalars["String"]>
}

export type ConsultingDataReturnType = {
  slides: ImageType[]
  content: Maybe<Scalars["String"]>
  callout: ConsultingCalloutReturnType
  infocards: TitleContentType[]
  certificates: ImageCardType[]
}

export type ConsultingPageReturnType = PageCommonType & {
  consulting: ConsultingDataReturnType
}

export interface ConsultingQueryDataReturnType
  extends ApolloGenericReturnDataType {
  page: ConsultingPageReturnType
}

export interface ConsultingQueryReturnType extends ApolloReturnInfoType {
  data: ConsultingQueryDataReturnType
}
