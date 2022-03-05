import jwt_decode from "jwt-decode"
import { gql } from "@apollo/client/core"

import { authConstants } from "@lib"
import initializeApollo from "@lib/apollo/client"
import { isServer } from "@lib/utils"
import { AddToCartInput } from "@api/gql/types"

const addToCartMutation = gql`
  mutation addCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        isEmpty: contents {
          itemCount
          productCount
          edges {
            node {
              extraData {
                key
                value
              }
            }
          }
        }
      }
    }
  }
`

const useCart = () => {
  const getWooSession = () => {
    if (!isServer) {
      return localStorage.getItem(authConstants.WOO_SESSION_KEY)
    }
    return null
  }

  const getClientShopId = () => {
    if (!isServer) {
      const sessionToken = getWooSession() || ""
      if (sessionToken) {
        const clientShopId =
          jwt_decode<{ data: { customer_id: string } }>(sessionToken).data
            .customer_id

        return clientShopId
      }
    }
  }

  const addToCart = async (input: AddToCartInput) => {
    const apolloClient = initializeApollo({})

    const { data, errors } = await apolloClient.mutate({
      mutation: addToCartMutation,
      variables: { input },
      errorPolicy: "all",
    })

    await apolloClient.refetchQueries({ include: ["CartQuery"] })

    return { data, errors }
  }

  return { addToCart, getClientShopId }
}

export default useCart
