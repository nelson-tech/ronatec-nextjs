import {
  ApolloReturnInfoType,
  CardType,
  PageCommonType,
  SalesRepType,
} from ".."

export type ContactPageType = PageCommonType & {
  contactInfo: {
    card: CardType[]
    salesReps: SalesRepType[]
  }
}

export interface ContactQueryDataReturnType {
  page: ContactPageType
}

export interface ContactQueryReturnType extends ApolloReturnInfoType {
  data: ContactQueryDataReturnType
}
