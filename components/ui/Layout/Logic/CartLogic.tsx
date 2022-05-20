import { useEffect } from "react"

import useStore from "@lib/hooks/useStore"
import { Cart, useGetCartQuery } from "@api/gql/types"

const CartLogic = () => {
  const { setCart, setLoading } = useStore(state => ({
    setCart: state.cart.setCart,
    setLoading: state.cart.setLoading,
  }))

  const [{ data, fetching }] = useGetCartQuery()

  // Catch data from cart query
  useEffect(() => {
    if (data?.cart) {
      setCart(data.cart as Cart)
    }
  }, [data, setCart])

  // Set loading in state
  useEffect(() => {
    setLoading(fetching)
  }, [fetching, setLoading])

  return <></>
}

export default CartLogic
