import { gql } from "@apollo/client"
import { generalPageQuery } from "../fragments"

export { getHomeData } from "./home"
export { getConsultingData } from "./consulting"

export const getGeneralPageData = gql`
  query GetGeneralPageData {
    ${generalPageQuery}
  }
`
