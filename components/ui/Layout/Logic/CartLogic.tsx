import { useEffect } from "react"

import useStore from "@lib/hooks/useStore"
import { Cart, useGetCartQuery } from "@api/gql/types"

const CartLogic = () => {
  const setCart = useStore(state => state.cart.setCart)

  const [cartData] = useGetCartQuery()

  useEffect(() => {
    // Catch data from cart query
    const data = cartData.data
    if (data?.cart) {
      setCart(data.cart as Cart)
    }
  }, [cartData, setCart])

  return <></>
}

export default CartLogic
